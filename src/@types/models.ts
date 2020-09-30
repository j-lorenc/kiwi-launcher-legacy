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
  }
}
