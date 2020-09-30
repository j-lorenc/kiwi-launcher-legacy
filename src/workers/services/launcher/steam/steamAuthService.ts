import { query } from '../../../../shared/db';
import steamPersistenceService from './steamPersistenceService';
import { v4 as uuid } from 'uuid';
// import Store from 'electron-store';

interface AuthRecord {
  auth_id: string;
  launcher_id: string;
  user_id?: string;
  api_token?: string;
  refresh_token?: string;
}

class SteamAuthService {
  async selectAuth(): Promise<AuthRecord> {
    const launcher = await steamPersistenceService.retrieveLauncher();
    return await query<AuthRecord>((database) => {
      return new Promise((resolve, reject) => {
        database.all(
          `select * from auth where launcher_id = '${launcher.launcher_id}'`,
          (err, rows: AuthRecord[]) => {
            if (err) {
              reject(err);
            }

            resolve(rows[0]);
          }
        );
      });
    });
  }

  async insertSteamCreds(steamUserKey: string, steamApiKey: string): Promise<void> {
    const launcher = await steamPersistenceService.retrieveLauncher();

    await query<void>((database) => {
      const authToInsert = database.prepare(
        `insert into auth(auth_id, user_id, api_token, launcher_id) values('${uuid()}', ?, ?, ?)`
      );

      authToInsert.run(steamUserKey, steamApiKey, launcher.launcher_id);
      return;
    });
  }

  async updateSteamCreds(steamUserKey: string, steamApiKey: string): Promise<void> {
    const launcher = await steamPersistenceService.retrieveLauncher();

    await query<void>((database) => {
      database.run(
        `update auth set user_id = '${steamUserKey}', api_token = '${steamApiKey}' where launcher_id = '${launcher.launcher_id}'`
      );
    });
  }

  async storeSteamCreds(steamUserKey: string, steamApiKey: string): Promise<void> {
    query<void>(
      async (): Promise<void> => {
        const auth = await this.selectAuth();

        if (!(await auth)) {
          await this.insertSteamCreds(steamUserKey, steamApiKey);
        } else {
          await this.updateSteamCreds(steamUserKey, steamApiKey);
        }
      }
    );
  }

  async retrieveSteamCreds(): Promise<SteamCreds> {
    const auth = await this.selectAuth();

    return {
      steamUserKey: auth.user_id,
      steamApiKey: auth.api_token,
    } as SteamCreds;
  }
}

interface SteamCreds {
  steamUserKey: string;
  steamApiKey: string;
}

export default new SteamAuthService();
