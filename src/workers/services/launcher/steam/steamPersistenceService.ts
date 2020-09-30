import { Game } from '../../../../@types/models';
import { query } from '../../../../shared/db';
import { v4 as uuid } from 'uuid';
import { DBGame, Launcher } from '../../../../@types';

export const retrieveLauncher = async (): Promise<Launcher> => {
  return await query<Launcher>(async (database) => {
    const launcherPromise = new Promise<Launcher>((resolve, reject) => {
      database.each(`select * from launchers where name = 'Steam'`, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
    const launcher = await launcherPromise;
    if (!launcher) {
      database.run(`insert into launchers(launcher_id, name) values ('${uuid()}', 'Steam')`);
      const launcherPromise2 = new Promise<Launcher>((resolve, reject) => {
        database.each(`select * from launchers where name = 'Steam'`, (err, row: Launcher) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        });
      });
      return launcherPromise2;
    }

    return launcher;
  });
};

const retrieveSavedGames = async (): Promise<Game[]> => {
  const dbGames = await query<DBGame[]>((database) => {
    const gamePromise = new Promise<DBGame[]>((resolve, reject) => {
      database.all(`select * from games`, (err, rows: DBGame[]) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    return gamePromise;
  });

  const games = (await Promise.all(dbGames)).map((game) => {
    return new Game(
      game.game_id,
      game.name,
      game.original_id,
      game.icon_url,
      game.background_url,
      game.cover_url
    );
  });

  return games;
};

const saveGames = async (games: Game[]): Promise<void> => {
  const launcher = await retrieveLauncher();

  await query<void>((database) => {
    const query = `insert into games(game_id, name, original_id, icon_url, background_url, cover_url, launcher_id) values (?,?,?,?,?,?,?)`;

    const insertQuery = database.prepare(query);
    for (const game of games) {
      insertQuery.run(
        game.id,
        game.name,
        game.originalId,
        game.iconUrl || null,
        game.backgroundUrl || null,
        game.coverUrl || null,
        launcher.launcher_id
      );
    }

    insertQuery.finalize();
  });
};

export default { retrieveSavedGames, saveGames, retrieveLauncher };
