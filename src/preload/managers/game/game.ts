import steamService from '../../services/launchers/steam/steamService';
import shell from 'child_process';
import { remote } from 'electron';
import steamAuthService from '../../services/launchers/steam/steamAuthService';

class GameManager {
  async attachEvents(e: MessageEvent) {
    if (e.data.type === 'request-games-list') {
      await this.requestGamesList();
    }

    if (e.data.type === 'refresh-games-list') {
      await this.import();
    }

    if (e.data.type === 'submit-creds') {
      this.submitCreds(e.data.value.steamUserKey, e.data.value.steamApiKey);
    }

    if (e.data.type === 'launch-game') {
      this.launchGame(e.data.value);
    }

    if (e.data.type === 'open-store') {
      this.openStore();
    }
  }

  async requestGamesList() {
    const existingGames = await steamService.retrieveSavedGames();
    window.postMessage(
      {
        type: 'games',
        value: existingGames,
      },
      '*'
    );

    await this.import();
  }

  async import() {
    steamService.import().then((games) => {
      window.postMessage(
        {
          type: 'games',
          value: games,
        },
        '*'
      );
    });
  }

  submitCreds(steamUserKey: string, steamApiKey: string) {
    steamAuthService.storeSteamCreds(steamUserKey, steamApiKey);
  }

  launchGame(id: string) {
    steamService.launchGame(id);
    remote.getCurrentWindow().minimize();
  }

  openStore() {
    shell.exec(`start steam://openurl/https://store.steampowered.com/`, {});
  }
}

export default new GameManager();
