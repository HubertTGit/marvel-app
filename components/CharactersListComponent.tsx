"use client";

import { Character } from "@/model/api.characters.model";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import loadMore from "@/actions/loadMore";
import { rgbDataURL } from "@/lib/utils";
import { ThumbSkeletonsComponent } from "./ThumbSkeletonsComponent";
import { ChevronDownCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Link from "next/link";
import { LinkIconComponent } from "./LinkIconComponent";
import { toast } from "sonner";

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const onLoadAction = useCallback(() => {
    if (characterList.length > pageTotal) return;
    setTransition(async () => {
      try {
        const _charList = await loadMore(characterList.length);
        setCharacterList([...characterList, ..._charList]);
      } catch (error: any) {
        scrollerRef.current?.scrollIntoView({ behavior: "smooth" });
        toast(error.message);
      }
    });
  }, [characterList, pageTotal]);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    // Create a new IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is in view, entry.isIntersecting will be true
        if (entry.isIntersecting) {
          setTimeout(() => {
            onLoadAction();
          }, 1500);
        }
      },
      {
        // Adjust the rootMargin to control when the callback is fired
        rootMargin: "0px",
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Start observing the element with the ref
    return () => {
      // Stop observing the element on cleanup

      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onLoadAction]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6" ref={scrollerRef}>
        {characterList.map((character: Character) => (
          <div key={character.id} className="relative h-[150px] w-[150px]">
            <Dialog>
              <DialogTrigger>
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  fill
                  sizes="150px"
                  placeholder="blur"
                  blurDataURL={rgbDataURL(237, 181, 6)}
                  alt={character.name}
                  className="absolute cursor-pointer rounded-md object-cover transition-transform duration-150 ease-in-out hover:z-10 hover:scale-125"
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
                      className="h-[150px] w-[150px] rounded-full object-cover"
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
                                variant: "outline",
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
                      "flex h-[150px] w-full items-center justify-center"
                    }`}
                  >
                    {character.description.length
                      ? character.description
                      : "description not available"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <h3 className="absolute left-1 drop-shadow">{character.name}</h3>
          </div>
        ))}

        {isPending && <ThumbSkeletonsComponent />}
      </div>
      <div className="flex w-full justify-center p-2" ref={loadMoreRef}>
        <ChevronDownCircle className="h-6 w-6 animate-bounce" />
      </div>
    </>
  );
}
