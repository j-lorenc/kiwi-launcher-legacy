import { remote } from 'electron';
import shell from 'child_process';
import { v4 as uuid } from 'uuid';
import {
  Game,
  SteamGameMetaDataResponse,
  SteamApiGame,
  SteamGameMetaData,
} from '../../../../@types';
import path from 'path';
import steamAuthService from './steamAuthService';
import steamRegistryService from './steamRegistryService';
import steamApiService from './steamApiService';
import steamVdfService from './steamVdfService';
import Store from 'electron-store';

class SteamService {
  store: Store;

  constructor() {
    this.store = new Store();
  }

  attachEvents() {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'submit-steam-creds') {
        steamAuthService.storeSteamCreds(e.data.value.steamUserKey, e.data.value.steamApiKey);
      }
    });

    window.addEventListener('message', (e) => {
      if (e.data.type === 'launch-game') {
        this.launchGame(e.data.value);
        remote.getCurrentWindow().minimize();
      }
    });

    window.addEventListener('message', async (e) => {
      if (e.data.type === 'request-games-list') {
        const existingGames = await this.retrieveSavedGames();
        window.postMessage(
          {
            type: 'games',
            value: existingGames,
          },
          '*'
        );

        this.import().then((games) => {
          window.postMessage(
            {
              type: 'games',
              value: games,
            },
            '*'
          );
        });
      }
    });
  }

  async isInstalled(): Promise<boolean> {
    const installPath = await this.getInstallPath();
    return !!installPath;
  }

  async getInstallPath(): Promise<string> {
    return path.join(await steamRegistryService.getInstallPath(), 'Steam.exe');
  }

  async retrieveSavedGames(): Promise<Game[]> {
    return this.store.get('games', []) as Game[];
  }

  async retrieveOwnedGames(): Promise<SteamApiGame[]> {
    return (await steamApiService.retrieveGamesList()).response.games;
  }

  async parseNewGames(savedGames: Game[]): Promise<Game[]> {
    const ownedGames: SteamApiGame[] = await this.retrieveOwnedGames();
    const savedGameIds = savedGames.map((game) => game.originalId);

    const newGames = ownedGames
      .filter((ownedGame) => !savedGameIds.includes(ownedGame.appid))
      .map((steamGame) => {
        return {
          id: uuid(),
          name: steamGame.name,
          originalId: steamGame.appid,
          iconUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${steamGame.appid}/${steamGame.img_icon_url}.jpg`,
        };
      });

    return newGames;
  }

  async addMetadataToGames(games: Game[]): Promise<Game[]> {
    const gamesWithMetadata = [] as Game[];
    for (const game of games) {
      const gameMetaData: SteamGameMetaData = (await this.retrieveMetadata(game))?.[
        game.originalId.toString()
      ]?.data;

      if (gameMetaData) {
        gamesWithMetadata.push({
          ...game,
          backgroundUrl: gameMetaData.screenshots?.[0].path_full || gameMetaData.background,
          coverUrl: gameMetaData?.header_image,
        });
      }
    }

    return gamesWithMetadata as Game[];
  }

  async updateGamePlayData(games: Game[]): Promise<Game[]> {
    const installedGames = await this.getInstalledGamesList();

    return games.map((game) => {
      const installedGame = installedGames.find((iGame) => iGame.originalId == game.originalId);
      game.installed = !!installedGame;

      return game;
    }) as Game[];
  }

  saveGames(games: Game[]) {
    this.store.set('games', games);
  }

  async import() {
    const savedGames = await this.retrieveSavedGames();
    const newGames = await this.parseNewGames(savedGames);
    const newGamesWithMetaData = await this.addMetadataToGames(newGames);

    const allGames = savedGames.concat(newGamesWithMetaData);
    const gamesWithLiveData = await this.updateGamePlayData(allGames);
    this.saveGames(gamesWithLiveData);

    return gamesWithLiveData;
  }

  async retrieveMetadata(game: Game): Promise<SteamGameMetaDataResponse> {
    return await steamApiService.fetchGameData(game.originalId as number);
  }

  async getInstalledGamesList(): Promise<Game[]> {
    return await steamVdfService.getInstalledGamesFromVdfs();
  }

  async launchGame(id: string | number) {
    const steamInstallPath = await this.getInstallPath();

    shell.spawn(steamInstallPath, ['-applaunch', id.toString()], {
      cwd: steamInstallPath.split('\\').slice(0, -1).join('\\'),
    });
  }
}

export default new SteamService();
