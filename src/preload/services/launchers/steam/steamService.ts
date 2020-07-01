import { remote } from 'electron';
import shell from 'child_process';
import { v4 as uuid } from 'uuid';
import { SteamApiGamesListReponse, Game, SteamGameMetaDataResponse } from '../../../../@types';
import path from 'path';
import steamAuthService from './steamAuthService';
import steamRegistryService from './steamRegistryService';
import steamApiService from './steamApiService';
import steamVdfService from './steamVdfService';

class SteamService {
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

    window.addEventListener('message', (e) => {
      if (e.data.type === 'request-games-list') {
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

  async import() {
    const gamesList = (await steamApiService.retrieveGamesList()) as SteamApiGamesListReponse;
    const installedGamesList = await steamVdfService.getInstalledGamesFromVdfs();

    console.log(installedGamesList);

    const games = gamesList.response.games.map(
      (game): Game => {
        const installedGame = installedGamesList.find((installedGameListItem) => {
          return (installedGameListItem.originalId as number) == game.appid;
        });

        console.log(installedGame);

        return {
          id: installedGame?.id ? installedGame.id : uuid(),
          name: game.name,
          originalId: game.appid,
          iconUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
          installed: installedGame?.installed,
          lastPlayed: installedGame?.lastPlayed,
        };
      }
    );

    for (const game of games) {
      const gameMetaDataResponse = (await this.retrieveMetadata(game)) as SteamGameMetaDataResponse;

      if (gameMetaDataResponse && gameMetaDataResponse[game.originalId]) {
        const gameMetaData = gameMetaDataResponse[game.originalId].data;
        game.backgroundUrl =
          gameMetaData && gameMetaData.screenshots
            ? gameMetaData.screenshots[0].path_full
            : gameMetaData
            ? gameMetaData.background
            : undefined;
        game.coverUrl = gameMetaData?.header_image;
      }
    }

    return games;
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
