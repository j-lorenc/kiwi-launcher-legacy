import { generateEncryptionKey } from './keytar';
import Store from 'electron-store';
import { remote } from 'electron';
import { v4 as uuid } from 'uuid';
import { SteamApiGamesListReponse, Game, SteamGameMetaDataResponse } from '../../@types';

class SteamService {
  attachEvents() {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'submit-steam-creds') {
        this.storeSteamCreds(e.data.value.steamUserKey, e.data.value.steamApiKey);
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

  async buildStore() {
    const key = await generateEncryptionKey();

    const store = new Store({
      name: 'userPrefs',
      encryptionKey: key,
    });

    return store;
  }

  async storeSteamCreds(steamUserKey: string, steamApiKey: string) {
    const store = await this.buildStore();

    store.set('steam', {
      steamUserKey,
      steamApiKey,
    });
  }

  async retrieveSteamCreds() {
    const store = await this.buildStore();

    const creds = store.get('steam');
    return creds;
  }

  async import() {
    const gamesList = (await this.retrieveGamesList()) as SteamApiGamesListReponse;
    const games = gamesList.response.games.map(
      (game): Game => {
        return {
          id: uuid(),
          name: game.name,
          originalId: game.appid,
          iconUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
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
    const metadata = await this.fetchGameData(game.originalId as number);
    return metadata;
  }

  async retrieveGamesList(): Promise<SteamApiGamesListReponse> {
    const { steamUserKey, steamApiKey } = await this.retrieveSteamCreds();

    return new Promise((resolve, reject) => {
      const request = remote.net.request(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamUserKey}&format=json&include_appinfo=1&include_played_free_games=1`
      );
      let json = '';
      request.on('response', (response) => {
        response.on('end', () => {
          try {
            resolve(JSON.parse(json));
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });

        response.on('data', (chunk) => {
          json += chunk.toString('utf-8');
        });
      });
      request.end();
    });
  }

  async fetchGameData(appId: number): Promise<SteamGameMetaDataResponse> {
    const promise = new Promise((resolve, reject) => {
      const requestQ = remote.net.request(
        `https://store.steampowered.com/api/appdetails?appids=${appId}`
      );
      let json = '';

      requestQ.on('response', (response) => {
        response.on('end', () => {
          try {
            resolve(JSON.parse(json));
          } catch (err) {
            reject(err);
          } finally {
            reject();
          }
        });

        response.on('data', (chunk) => {
          json += chunk.toString('utf-8');
        });
      });

      requestQ.on('error', (error) => {
        reject(error);
      });

      requestQ.end();
    });

    return promise as Promise<SteamGameMetaDataResponse>;
  }
}

export default new SteamService();
