"use client";

import { Character } from "@/model/api.characters.model";
import { FC, forwardRef, useImperativeHandle, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { rgbDataURL } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LinkIconComponent } from "./LinkIconComponent";
import { ThumbSkeletonsComponent } from "./ThumbSkeletonsComponent";
import { ChevronDownCircle } from "lucide-react";

interface GridlistProps {
  characterList: Character[];
  isPending: boolean;
}

const _GridlistComponent = forwardRef<any, GridlistProps>((props, ref) => {
  const { characterList, isPending } = props;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollerRef: scrollerRef.current,
        loadMoreRef: loadMoreRef.current,
      };
    },
    [],
  );

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
});

_GridlistComponent.displayName = "GridlistComponent"; // Add display name

export const GridlistComponent = _GridlistComponent; // No need for forwardRef here
