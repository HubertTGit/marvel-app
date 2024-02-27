'use client';

import { Character } from '@/model/api.model';
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import loadMore from '@/actions/loadMore';
import { rgbDataURL } from '@/lib/utils';
import { ThumbSkeletonsComponent } from './ThumbSkeletonsComponent';
import { CharacterListSkeleton } from './CharacterListSkeleton';
import { ChevronDownCircle } from 'lucide-react';

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
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const onLoadAction = useCallback(() => {
    if (characterList.length > pageTotal) return;
    setTransition(async () => {
      const _charList = await loadMore(characterList.length);
      setCharacterList([...characterList, ..._charList]);
    });
  }, [characterList, pageTotal]);

  useEffect(() => {
    // Create a new IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is in view, entry.isIntersecting will be true
        if (entry.isIntersecting) {
          setTimeout(() => {
            onLoadAction();
          }, 1000);
        }
      },
      {
        // Adjust the rootMargin to control when the callback is fired
        rootMargin: '0px',
      }
    );

    // Start observing the element with the ref
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      // Stop observing the element on cleanup
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [onLoadAction]);

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
      </div>
      <div className="flex w-full p-2 justify-center" ref={loadMoreRef}>
        <ChevronDownCircle className="h-6 w-6 animate-bounce" />
      </div>
    </Suspense>
  );
}
