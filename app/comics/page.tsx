import CharactersList from '@/components/CharactersListComponent';
import { uri } from '@/lib/uri';
import { Character } from '@/model/api.characters.model';
import { Comics, ComicsData } from '@/model/api.comics.model';
import Image from 'next/image';

export default async function ComicsPage() {
  const url = uri('comics', 100, 0);
  const getData = await fetch(url);
  const result = await getData.json();
  const comicData: ComicsData = result.data;

  return (
    <ul className="flex flex-wrap gap-3">
      {comicData.results.map((comic: Comics) => (
        <li key={comic.id}>
          <Image
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.issueNumber.toString()}
            height={150}
            width={150}
          />
        </li>
      ))}
    </ul>
  );
}
