import { generateEncryptionKey } from '../../keytar/keytar';
import Store from 'electron-store';

class SteamAuthService {
  async buildStore(): Promise<Store> {
    const key = await generateEncryptionKey();

    const store = new Store({
      name: 'userPrefs',
      encryptionKey: key,
    });

    return store;
  }

  async storeSteamCreds(steamUserKey: string, steamApiKey: string): Promise<void> {
    const store = await this.buildStore();

    store.set('steam', {
      steamUserKey,
      steamApiKey,
    });
  }

  async retrieveSteamCreds(): Promise<SteamCreds> {
    const store = await this.buildStore();

    const creds = store.get('steam');
    return creds;
  }
}

interface SteamCreds {
  steamUserKey: string;
  steamApiKey: string;
}

export default new SteamAuthService();
