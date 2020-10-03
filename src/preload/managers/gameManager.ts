import steamService from '../services/launchers/steam/steamService';
import shell from 'child_process';
import { remote } from 'electron';
import steamAuthService from '../services/launchers/steam/steamAuthService';

const submitCreds = (steamUserKey: string, steamApiKey: string): void => {
  steamAuthService.storeSteamCreds(steamUserKey, steamApiKey);
};

const launchGame = (id: string): void => {
  steamService.launchGame(id);
  remote.getCurrentWindow().minimize();
};

const openStore = (): void => {
  shell.exec(`start steam://openurl/https://store.steampowered.com/`, {});
};

export default {
  submitCreds,
  launchGame,
  openStore,
};
