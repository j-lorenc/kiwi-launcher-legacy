import { SteamGameMetaDataResponse, SteamApiGamesListReponse } from '../../../../@types';
import { remote } from 'electron';
import steamAuthService from './steamAuthService';

class SteamApiService {
  async retrieveGamesList(): Promise<SteamApiGamesListReponse> {
    const { steamUserKey, steamApiKey } = await steamAuthService.retrieveSteamCreds();

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
    return new Promise((resolve, reject) => {
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
  }
}

export default new SteamApiService();
