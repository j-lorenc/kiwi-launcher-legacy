import {
  SteamGameMetaDataResponse,
  SteamApiGamesListReponse,
  SteamApiGame,
} from '../../../../@types';
import steamAuthService from './steamAuthService';
import fetch from 'node-fetch';

class SteamApiService {
  async retrieveOwnedGames(): Promise<SteamApiGame[]> {
    const steamGameApiData = await this.retrieveGamesList();
    return steamGameApiData.response.games;
  }

  async retrieveGamesList(): Promise<SteamApiGamesListReponse> {
    const { steamUserKey, steamApiKey } = await steamAuthService.retrieveSteamCreds();

    try {
      const res = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamUserKey}&format=json&include_appinfo=1&include_played_free_games=1`,
        {}
      );
      return res.json();
    } catch (err) {
      return err;
    }
  }

  async fetchGameData(appId: string): Promise<SteamGameMetaDataResponse> {
    const { steamApiKey } = await steamAuthService.retrieveSteamCreds();
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${steamApiKey}&format=json`;
    try {
      const res = await fetch(url, {});
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

export default new SteamApiService();
