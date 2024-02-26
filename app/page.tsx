import CharactersList from '@/components/CharactersListComponent';
import { uri } from '@/lib/uri';
import { Character } from '@/model/api.model';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

export default async function Home() {
  const url = uri('characters');
  const getData = await fetch(url);
  const result = await getData.json();
  const characters: Character[] = result.data.results;

  console.log(result);

  return (
    <>
      <CharactersList characters={characters} />
    </>
  );
}
