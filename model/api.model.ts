export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: URL[];
}

interface Comics {
  available: number;
  collectionURI: string;
  items: ComicsItem[];
  returned: number;
}

interface ComicsItem {
  resourceURI: string;
  name: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
}

interface StoriesItem {
  resourceURI: string;
  name: string;
  type: ItemType;
}

enum ItemType {
  Cover = 'cover',
  Empty = '',
  InteriorStory = 'interiorStory',
}

interface Thumbnail {
  path: string;
  extension: Extension;
}

enum Extension {
  GIF = 'gif',
  Jpg = 'jpg',
}

interface URL {
  type: URLType;
  url: string;
}

enum URLType {
  Comiclink = 'comiclink',
  Detail = 'detail',
  Wiki = 'wiki',
}
