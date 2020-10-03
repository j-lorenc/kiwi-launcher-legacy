import shell from 'child_process';
import { v4 as uuid } from 'uuid';
import {
  SteamGameMetaDataResponse,
  SteamApiGame,
  SteamGameMetaData,
  GameInstallData,
} from '../../../../@types';
import path from 'path';
import steamRegistryService from './steamRegistryService';
import steamApiService from './steamApiService';
import steamVdfService from './steamVdfService';
import steamPersistenceService from './steamPersistenceService';
import { Game } from '../../../../@types/models';

import ipc from 'node-ipc';

const getNewGamesFromOwnedGames = (installedGameData, ownedGames) => {
  const ownedGamesIds = ownedGames.map((ownedGame) => ownedGame.originalId.toString());

  const installedGamesNewGames: Game[] = installedGameData
    .map((installedGame) => {
      return new Game(uuid(), installedGame.name, installedGame.originalId.toString());
    })
    .filter((game) => {
      return !ownedGamesIds.includes(game.originalId.toString());
    });

  return installedGamesNewGames;
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class SteamService {
  async isInstalled(): Promise<boolean> {
    const installPath = await this.getInstallPath();
    return !!installPath;
  }

  async getInstallPath(): Promise<string> {
    return path.join(await steamRegistryService.getInstallPath(), 'Steam.exe');
  }

  async parseNewGames(savedGames: Game[]): Promise<Game[]> {
    const ownedGameData: SteamApiGame[] = await steamApiService.retrieveOwnedGames();

    const savedGameIds = savedGames.map((game) => game.originalId);
    const installedGameData = await this.getInstalledGamesList();

    const ownedGames: Game[] = ownedGameData.map((steamGame) => {
      return new Game(uuid(), steamGame.name, steamGame.appid.toString());
    });

    const installedGamesNewGames = getNewGamesFromOwnedGames(installedGameData, ownedGames);

    const newGames = ownedGames
      .concat(installedGamesNewGames)
      .filter((game) => !savedGameIds.includes(game.originalId));

    return newGames;
  }

  async addMetadataToGames(games: Game[]): Promise<void> {
    for (const game of games) {
      await this.addMetadataToGame(game);
    }
  }

  addMetadataToGame = async (game: Game) => {
    const iconUrl = `file://${path.join(
      await steamRegistryService.getInstallPath(),
      'appcache\\librarycache',
      `${game.originalId}_icon.jpg`
    )}`;

    game.iconUrl = iconUrl;

    const gameMeta = await this.retrieveMetadata(game);
    await timeout(1000);

    if (gameMeta) {
      const gameMetaData: SteamGameMetaData = gameMeta[parseInt(game.originalId)]?.data;

      if (gameMetaData) {
        game.backgroundUrl = gameMetaData?.screenshots?.[0].path_full || gameMetaData?.background;
        game.coverUrl = gameMetaData?.header_image;
      }
    }
  };

  async updateGamePlayData(games: Game[]): Promise<void> {
    const installedGames = await this.getInstalledGamesList();
    const ownedApiGames: SteamApiGame[] = await steamApiService.retrieveOwnedGames();

    games.forEach((game) => {
      const installedGame = installedGames.find((iGame) => iGame.originalId == game.originalId);
      const playtimeGame = ownedApiGames.find(
        (ownedGame) => ownedGame.appid.toString() == game.originalId
      );

      game.installed = !!installedGame;
      game.lastPlayed = installedGame?.lastPlayed;
      game.playtime = playtimeGame?.playtime_forever;
    });
  }

  async retrieveMetadata(game: Game): Promise<SteamGameMetaDataResponse> {
    return await steamApiService.fetchGameData(game.originalId);
  }

  async getInstalledGamesList(): Promise<GameInstallData[]> {
    return await steamVdfService.getInstalledGamesFromVdfs();
  }

  async launchGame(id: string | number) {
    const steamInstallPath = await this.getInstallPath();

    shell.exec(`start steam://run/${id}`, {
      cwd: steamInstallPath.split('\\').slice(0, -1).join('\\'),
    });
  }

  async import() {
    const savedGames = await steamPersistenceService.retrieveSavedGames();
    ipc.of.renderer.emit('games-list', {
      id: ipc.config.id,
      message: savedGames,
    });
    const newGames = await this.parseNewGames(savedGames);

    await this.addMetadataToGames(newGames);

    const allGames = savedGames.concat(newGames);

    await this.updateGamePlayData(allGames);
    await steamPersistenceService.saveGames(newGames);

    return allGames;
  }
}

export default new SteamService();
