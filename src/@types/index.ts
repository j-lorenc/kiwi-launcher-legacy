import { Dispatch } from 'react';
import { Game } from './models';
export interface GameFilter {
  gameName: string;
}

export interface WindowSettings {
  currentWindow: CurrentWindow;
}

export interface FilterContextType {
  state: GameFilter;
  dispatch: Dispatch<FilterAction>;
}

export interface SelectedGameContextType {
  state: Game;
  dispatch: Dispatch<SelectedGameAction>;
}

export interface WindowContextType {
  state: WindowSettings;
  dispatch: Dispatch<SetCurrentWindowAction>;
}

export type FilterAction = { type: 'filter'; payload: string };

export type SelectedGameAction = { type: 'setSelectedGame'; payload: Game };

export type SetCurrentWindowAction = { type: 'setCurrentWindow'; payload: CurrentWindow };

export enum CurrentWindow {
  HOME,
  LIST,
}

export interface SteamApiGamesListReponse {
  response: SteamApiGamesList;
}

export interface SteamApiGamesList {
  games: SteamApiGame[];
  game_count: number;
}

export interface SteamApiGame {
  appid: number;
  has_community_visible_stats: boolean;
  img_icon_url: string;
  image_logo_url: string;
  name: string;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
}

export interface SteamGameMetaDataResponse {
  [key: number]: {
    data: SteamGameMetaData;
  };
}

export interface SteamGameMetaData {
  about_the_game: string;
  achievements: {
    highlighted: [
      {
        name: string;
        path: string;
      }
    ];
    total: number;
  };
  background: string;
  categories: [
    {
      id: number;
      description: string;
    }
  ];
  content_descriptors: {
    ids: number[];
  };
  header_image: string;
  screenshots: [
    {
      id: number;
      path_full: string;
      path_thumbnail: string;
    }
  ];
  steam_appid: number;
}

export interface GameInstallData {
  originalId: string | number;
  name: string;
  installed: boolean;
  playtime?: number;
  lastPlayed?: number;
}

export interface SteamGameLibraries {
  LibraryFolders: {
    [key: string]: string;
  };
}

export interface SteamAcfFile {
  AppState: {
    appid: number;
    Universe: number;
    name: string;
    StateFlags: number;
    installdir: string;
    LastUpdated: number;
    UpdateResult: number;
    SizeOnDisk: number;
    buildid: number;
    LastOwner: number;
    BytesToDownload: number;
    BytesDownloaded: number;
    AutoUpdateBehavior: number;
    AllowOtherDownloadsWhileRunning: number;
    ScheduledAutoUpdate: number;
    UserConfig: {
      name: string;
      gameid: number;
      language: string;
    };
  };
}

export interface SteamLocalConfig {
  UserLocalConfigStore: {
    Software: {
      Valve: {
        Steam: {
          apps: SteamLocalConfigApps;
        };
      };
    };
  };
}

export interface SteamLocalConfigApps {
  [key: string]: {
    LastPlayed: number;
    playTime: number;
  };
}

export interface Launcher {
  launcher_id: string;
  name: string;
}

export interface DBGame {
  game_id: string;
  name: string;
  launcher_id: string;
  original_id: string;
  icon_url?: string;
  background_url?: string;
  cover_url?: string;
}
