import { generateEncryptionKey } from './keytar';
import Store from 'electron-store';

class SteamService {
  attachEvents() {
    console.log('attached');
    window.addEventListener('message', (e) => {
      if (e.data.type === 'submit-steam-creds') {
        console.log('storingKey', e.data.value);
        this.storeSteamCreds(e.data.value.steamUserKey, e.data.value.steamApiKey);
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
}

export default new SteamService();
