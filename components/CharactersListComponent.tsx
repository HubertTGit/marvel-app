'use client';

import { Character } from '@/model/api.model';
import { Suspense, useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import loadMore from '@/actions/loadMore';
import { rgbDataURL } from '@/lib/utils';
import { ThumbSkeletonsComponent } from './ThumbSkeletonsComponent';
import { CharacterListSkeleton } from './CharacterListSkeleton';

interface CharactersListProps {
  characters: Character[];
  pageTotal: number;
}

export default function CharactersList({
  characters,
  pageTotal,
}: CharactersListProps) {
  const [characterList, setCharacterList] = useState(characters);
  const [isPending, setTransition] = useTransition();

  const onLoadAction = () => {
    if (characterList.length > pageTotal) return;
    setTransition(async () => {
      const _charList = await loadMore(characterList.length);
      setCharacterList([...characterList, ..._charList]);
    });
  };

  return (
    <Suspense fallback={<CharacterListSkeleton />}>
      <div className="flex flex-wrap gap-4">
        {characterList.map((character: Character) => (
          <div key={character.id} className="w-[150px] h-[150px] relative">
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              fill
              sizes="150px"
              placeholder="blur"
              blurDataURL={rgbDataURL(237, 181, 6)}
              alt={character.name}
              className="rounded-md absolute transition-transform object-cover hover:scale-110 duration-150 ease-in-out cursor-pointer"
            />

            <h3 className="absolute left-1 drop-shadow">{character.name}</h3>
          </div>
        ))}

        {isPending && <ThumbSkeletonsComponent />}

        <form action={onLoadAction}>
          <Button type="submit">Load More</Button>
        </form>
      </div>
    </Suspense>
  );
}
