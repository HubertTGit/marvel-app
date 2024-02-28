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
import { Button, buttonVariants } from './ui/button';
import loadMore from '@/actions/loadMore';
import { rgbDataURL } from '@/lib/utils';
import { ThumbSkeletonsComponent } from './ThumbSkeletonsComponent';
import { CharacterListSkeleton } from './CharacterListSkeleton';
import {
  ChevronDownCircle,
  LibraryBig,
  BookMarked,
  MessageCircleMore,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import Link from 'next/link';
import { LinkIconComponent } from './LinkIconComponent';

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
      console.log('loadMore', _charList);
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
      <div className="flex flex-wrap gap-6 justify-center">
        {characterList.map((character: Character) => (
          <div key={character.id} className="w-[150px] h-[150px] relative">
            <Dialog>
              <DialogTrigger>
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  fill
                  sizes="150px"
                  placeholder="blur"
                  blurDataURL={rgbDataURL(237, 181, 6)}
                  alt={character.name}
                  className="rounded-md absolute transition-transform object-cover hover:scale-125 hover:z-10 duration-150 ease-in-out cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent>
                <h1 className="text-xl">{character.name}</h1>
                <div className="flex gap-3">
                  <div>
                    <Image
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      width={150}
                      height={150}
                      placeholder="blur"
                      blurDataURL={rgbDataURL(237, 181, 6)}
                      alt={character.name}
                      className="rounded-full h-[150px] w-[150px] object-cover"
                    />
                    <div className="mt-2">
                      <ul className="flex gap-1">
                        {character.urls.map((url) => (
                          <li key={url.type}>
                            <Link
                              title={url.type}
                              href={url.url}
                              target="_blank"
                              className={buttonVariants({
                                variant: 'outline',
                              })}
                            >
                              <LinkIconComponent type={url.type} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p
                    className={`${
                      character.description.length === 0 &&
                      'flex justify-center items-center h-[150px] w-full'
                    }`}
                  >
                    {character.description.length
                      ? character.description
                      : 'description not available'}
                  </p>
                </div>
              </DialogContent>
            </Dialog>

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
