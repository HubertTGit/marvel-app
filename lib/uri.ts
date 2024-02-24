import { md5 } from 'js-md5';

const apikey = process.env.MARVEL_APIKEY;
const secret = process.env.MARVEL_SECRET;
const ts = Math.floor(Date.now() / 1000);

const hash = md5(ts + secret! + apikey!);

export const uri = (path: string): string =>
  `https://gateway.marvel.com/v1/public/${path}?ts=${ts}&apikey=${apikey}&hash=${hash}`;
