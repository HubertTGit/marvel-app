import CharactersList from '@/components/CharactersListComponent';
import { uri } from '@/lib/uri';
import { Character } from '@/model/api.model';

export default async function Home() {
  const url = uri('characters', 100, 0);
  const getData = await fetch(url);
  const result = await getData.json();
  const characters: Character[] = result.data.results;

  return (
    <CharactersList characters={characters} pageTotal={result.data.total} />
  );
}
