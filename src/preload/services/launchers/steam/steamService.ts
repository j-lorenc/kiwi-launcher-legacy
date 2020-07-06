import shell from 'child_process';
import { v4 as uuid } from 'uuid';
import {
  Game,
  SteamGameMetaDataResponse,
  SteamApiGame,
  SteamGameMetaData,
  GameInstallData,
} from '../../../../@types';
import path from 'path';
import steamRegistryService from './steamRegistryService';
import steamApiService from './steamApiService';
import steamVdfService from './steamVdfService';
import Store from 'electron-store';

class SteamService {
  store: Store;

  constructor() {
    this.store = new Store();
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
    const ownedApiGames: SteamApiGame[] = await this.retrieveOwnedGames();

    const savedGameIds = savedGames.map((game) => game.originalId);
    const installedGameData = await this.getInstalledGamesList();

    const ownedGames: Game[] = ownedApiGames.map((steamGame) => {
      return {
        id: uuid(),
        name: steamGame.name,
        originalId: steamGame.appid,
      };
    });

    const installedGamesNewGames: Game[] = installedGameData
      .map((installedGame) => {
        return {
          id: uuid(),
          name: installedGame.name,
          originalId: installedGame.originalId,
        };
      })
      .filter((game) => {
        const ownedGamesIds = ownedGames.map((ownedGame) => ownedGame.originalId.toString());
        return !ownedGamesIds.includes(game.originalId.toString());
      });

    const newGames = ownedGames
      .concat(installedGamesNewGames)
      .filter((game) => !savedGameIds.includes(game.originalId));

    return newGames;
  }

  async addMetadataToGames(games: Game[]): Promise<Game[]> {
    const gamesWithMetadata = [] as Game[];
    for (const game of games) {
      const gameMetaData: SteamGameMetaData = (await this.retrieveMetadata(game))?.[
        game.originalId.toString()
      ]?.data;

      if (gameMetaData) {
        const iconUrl = `file://${path.join(
          await steamRegistryService.getInstallPath(),
          'appcache\\librarycache',
          `${game.originalId}_icon.jpg`
        )}`;

        gamesWithMetadata.push({
          ...game,
          backgroundUrl: gameMetaData.screenshots?.[0].path_full || gameMetaData.background,
          coverUrl: gameMetaData?.header_image,
          iconUrl,
        });
      }
    }

    return gamesWithMetadata as Game[];
  }

  async updateGamePlayData(games: Game[]): Promise<Game[]> {
    const installedGames = await this.getInstalledGamesList();
    const ownedApiGames: SteamApiGame[] = await this.retrieveOwnedGames();

    return games.map((game) => {
      const installedGame = installedGames.find((iGame) => iGame.originalId == game.originalId);
      const playtimeGame = ownedApiGames.find((ownedGame) => ownedGame.appid == game.originalId);

      game.installed = !!installedGame;
      game.lastPlayed = installedGame?.lastPlayed;
      game.playtime = playtimeGame?.playtime_forever;
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

  async getInstalledGamesList(): Promise<GameInstallData[]> {
    return await steamVdfService.getInstalledGamesFromVdfs();
  }

  async launchGame(id: string | number) {
    const steamInstallPath = await this.getInstallPath();

    shell.exec(`start steam://run/${id}`, {
      cwd: steamInstallPath.split('\\').slice(0, -1).join('\\'),
    });
  }
}

export default new SteamService();
