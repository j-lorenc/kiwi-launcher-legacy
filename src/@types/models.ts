export class Game {
  id: string;
  name: string;
  originalId: string;
  iconUrl?: string;
  backgroundUrl?: string;
  coverUrl?: string;
  lastPlayed?: number;
  playtime?: number;
  installed?: boolean;
  verticalUrl?: string;
  logo?: string;

  constructor(
    id: string,
    name: string,
    originalId: string,
    iconUrl?: string,
    backgroundUrl?: string,
    coverUrl?: string
  ) {
    this.id = id;
    this.name = name;
    this.originalId = originalId;
    this.iconUrl = iconUrl;
    this.backgroundUrl = backgroundUrl;
    this.coverUrl = coverUrl;
    if (coverUrl) {
      this.verticalUrl = `file://C:\\Program Files (x86)\\Steam\\appcache\\librarycache\\${originalId}_library_600x900.jpg`;
    }
    if (coverUrl) {
      this.logo = `file://C:\\Program Files (x86)\\Steam\\appcache\\librarycache\\${originalId}_logo.png`;
    }
  }
}
