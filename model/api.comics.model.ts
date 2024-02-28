export interface ComicsData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Comics[];
}

export interface Comics {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: Description | null;
  modified: string;
  isbn: Isbn;
  upc: string;
  diamondCode: DiamondCode;
  ean: string;
  issn: string;
  format: Format;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: URL[];
  series: Series;
  variants: Series[];
  collections: any[];
  collectedIssues: Series[];
  dates: DateElement[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Characters;
}

interface Characters {
  available: number;
  collectionURI: string;
  items: Series[];
  returned: number;
}

interface Series {
  resourceURI: string;
  name: string;
}

interface Creators {
  available: number;
  collectionURI: string;
  items: CreatorsItem[];
  returned: number;
}

interface CreatorsItem {
  resourceURI: string;
  name: string;
  role: Role;
}

enum Role {
  Colorist = 'colorist',
  Editor = 'editor',
  Inker = 'inker',
  Letterer = 'letterer',
  Penciler = 'penciler',
  Penciller = 'penciller',
  PencillerCover = 'penciller (cover)',
  Writer = 'writer',
}

interface DateElement {
  type: DateType;
  date: string;
}

enum DateType {
  DigitalPurchaseDate = 'digitalPurchaseDate',
  FocDate = 'focDate',
  OnsaleDate = 'onsaleDate',
  UnlimitedDate = 'unlimitedDate',
}

enum Description {
  Empty = '',
  NA = '#N/A',
}

enum DiamondCode {
  Empty = '',
  Jul190068 = 'JUL190068',
}

enum Format {
  Comic = 'Comic',
  Digest = 'Digest',
  Empty = '',
  TradePaperback = 'Trade Paperback',
}

interface Thumbnail {
  path: string;
  extension: Extension;
}

enum Extension {
  Jpg = 'jpg',
}

enum Isbn {
  Empty = '',
  The0785111298 = '0-7851-1129-8',
  The0785114513 = '0-7851-1451-3',
  The0785115609 = '0-7851-1560-9',
}

interface Price {
  type: PriceType;
  price: number;
}

enum PriceType {
  DigitalPurchasePrice = 'digitalPurchasePrice',
  PrintPrice = 'printPrice',
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
  InteriorStory = 'interiorStory',
  Promo = 'promo',
}

interface TextObject {
  type: TextObjectType;
  language: Language;
  text: string;
}

enum Language {
  EnUs = 'en-us',
}

enum TextObjectType {
  IssueSolicitText = 'issue_solicit_text',
}

interface URL {
  type: URLType;
  url: string;
}

enum URLType {
  Detail = 'detail',
  InAppLink = 'inAppLink',
  Purchase = 'purchase',
  Reader = 'reader',
}
