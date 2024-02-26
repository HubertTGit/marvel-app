'use server';

import { uri } from '@/lib/uri';
import { Character } from '@/model/api.model';

export default async function loadMore(
  currentLength: number
): Promise<Character[]> {
  const url = uri('characters', 20, currentLength);
  const getData = await fetch(url);
  const result = await getData.json();
  console.log(result);

  return result.data.results;
}
