'use client';

import { Character } from '@/model/api.model';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import loadMore from '@/actions/loadMore';
import { Skeleton } from './ui/skeleton';

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const emptyArray = new Array(20).fill(null);

interface CharactersListProps {
  characters: Character[];
}

export default function CharactersList({ characters }: CharactersListProps) {
  const [characterList, setCharacterList] = useState(characters);
  const [isPending, setTransition] = useTransition();

  const f = () => {
    setTransition(async () => {
      const ch = await loadMore(characterList.length);
      setCharacterList([...characterList, ...ch]);
    });
  };

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  return (
    <div className="flex flex-wrap gap-4">
      <p>{isPending ? 'TRUE' : 'false'}</p>
      {characterList.map((character: Character) => (
        <div key={character.id} className="w-[150px] h-[150px] relative">
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            fill
            placeholder="blur"
            blurDataURL={rgbDataURL(237, 181, 6)}
            alt={character.name}
            className="rounded-md absolute transition-transform object-cover hover:scale-110 duration-150 ease-in-out cursor-pointer"
          />

          <h3 className="absolute left-1 drop-shadow">{character.name}</h3>
        </div>
      ))}

      {isPending &&
        emptyArray.map((_, i) => (
          <Skeleton
            key={i}
            className="w-[150px] h-[150px] rounded-md"
          ></Skeleton>
        ))}

      <form action={f}>
        <Button type="submit">Load More</Button>
      </form>
    </div>
  );
}
