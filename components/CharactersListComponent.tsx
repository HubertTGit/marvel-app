"use client";

import { Character } from "@/model/api.characters.model";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import loadMore from "@/actions/loadMore";
import { toast } from "sonner";
import { GridlistComponent } from "./GridListComponent";
import { useSearchParams } from "next/navigation";

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
  const gridRef = useRef<any>();
  const queryParam = useSearchParams();
  const display = queryParam.get("display");
  const isGrid = display === "grid";

  const onLoadAction = useCallback(() => {
    if (characterList.length > pageTotal) return;
    setTransition(async () => {
      try {
        const _charList = await loadMore(characterList.length);
        setCharacterList([...characterList, ..._charList]);
      } catch (error: any) {
        gridRef.current?.scrollerRef?.scrollIntoView({ behavior: "smooth" });
        toast(error.message);
      }
    });
  }, [characterList, pageTotal]);

  useEffect(() => {
    const currentRef = gridRef?.current.loadMoreRef;
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

    if (currentRef) {
      observer.observe(currentRef);
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
      {isGrid ? (
        <GridlistComponent
          characterList={characterList}
          isPending={isPending}
          ref={gridRef}
        />
      ) : (
        <div>Table</div>
      )}
    </>
  );
}
