import { MD5 } from 'crypto-js';

const apikey = process.env.MARVEL_APIKEY;
const secret = process.env.MARVEL_SECRET;
const ts = Math.floor(Date.now() / 1000);
const hash = MD5(ts + secret! + apikey!).toString();

export const uri = (path: string, limit = 20, offset = 0): string =>
  `https://gateway.marvel.com/v1/public/${path}?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}`;
