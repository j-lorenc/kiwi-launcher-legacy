import SteamID from 'steamid';
import fs from 'fs';
import vdf from 'vdf';
import path from 'path';
import steamRegistryService from './steamRegistryService';
import steamAuthService from './steamAuthService';
import {
  SteamGameLibraries,
  SteamAcfFile,
  Game,
  SteamLocalConfig,
  SteamLocalConfigApps,
} from '../../../../@types';

class SteamVdfService {
  async getSteamGameLibraryPaths(): Promise<string[]> {
    const steamInstallPath = await steamRegistryService.getInstallPath();

    const libraryFoldersFile = path.join(steamInstallPath, 'steamapps/libraryfolders.vdf');
    const libraryFoldersFileContents = fs.readFileSync(libraryFoldersFile, 'utf8');
    const steamGameLibrariesString = vdf.parse(libraryFoldersFileContents) as SteamGameLibraries;

    const steamGameLibraries = Object.keys(steamGameLibrariesString.LibraryFolders)
      .filter((key) => !isNaN(parseInt(key)))
      .map((library: string) => {
        return path.join(
          path.normalize(steamGameLibrariesString['LibraryFolders'][library]),
          'steamapps'
        );
      })
      .concat(path.join(steamInstallPath, 'steamapps'));

    return steamGameLibraries;
  }

  async getAcfFilesFromSteamLibraries(): Promise<string[]> {
    const steamGameLibraries = await this.getSteamGameLibraryPaths();

    const acfFiles = steamGameLibraries.reduce((acc, library) => {
      const files = fs.readdirSync(library, 'utf8').filter((file) => file.endsWith('.acf'));
      const filesWithPath: string[] = files.map((file) => {
        return path.join(library, file);
      });

      acc = acc.concat(filesWithPath);
      return acc;
    }, [] as string[]);

    return acfFiles;
  }

  async getConfigFromSteamLibraries(): Promise<SteamLocalConfigApps> {
    const steamInstallPath = await steamRegistryService.getInstallPath();
    const { steamUserKey } = await steamAuthService.retrieveSteamCreds();

    const sid = new SteamID(steamUserKey);
    const steam3Id = sid.getSteam3RenderedID().replace(']', '').split(':')[2];

    const configDir = path.join(steamInstallPath, `\\userdata\\${steam3Id}\\config`);
    const configFile = fs.readFileSync(path.join(configDir, 'localconfig.vdf'), 'utf8');
    const configObj = vdf.parse(configFile) as SteamLocalConfig;

    const apps = configObj['UserLocalConfigStore']['Software']['Valve']['Steam']['apps'];

    return apps;
  }

  async getInstalledGamesFromVdfs(): Promise<Game[]> {
    const acfFiles = await this.getAcfFilesFromSteamLibraries();
    const apps = await this.getConfigFromSteamLibraries();

    const steamGames = acfFiles
      .filter((acfFile) => {
        const steamGameFileVdf = vdf.parse(fs.readFileSync(acfFile, 'utf8')) as SteamAcfFile;
        //must have app state, name, install directory and exclude app 228980
        return (
          steamGameFileVdf['AppState'] &&
          steamGameFileVdf['AppState']['name'] &&
          steamGameFileVdf['AppState']['appid'] != 228980 &&
          steamGameFileVdf['AppState']['installdir']
        );
      })
      .map((acfFile) => {
        const steamGameFileVdf = vdf.parse(fs.readFileSync(acfFile, 'utf8')) as SteamAcfFile;
        const lastSession = apps[steamGameFileVdf.AppState.appid]
          ? apps[steamGameFileVdf.AppState.appid]['LastPlayed']
          : undefined;

        const { appid, name } = steamGameFileVdf.AppState;

        const installedGame = {
          originalId: appid,
          name,
          lastPlayed: lastSession,
          installed: true,
        } as Game;

        return installedGame;
      });

    return steamGames;
  }
}

export default new SteamVdfService();
