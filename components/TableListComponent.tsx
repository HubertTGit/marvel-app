"use client";

import { Character } from "@/model/api.characters.model";
import { Fragment, forwardRef, useImperativeHandle, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChevronDownCircle } from "lucide-react";
import { TableRowSkeletonComponent } from "./TableRowSkeletonComponent";

interface TableListComponentProps {
  characterList: Character[];
  isPending: boolean;
}

const _TableListComponent = forwardRef<any, TableListComponentProps>(
  (props, ref) => {
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
      <div className="p-2 px-5" ref={scrollerRef}>
        <Table>
          <TableHeader className="static">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Comics#</TableHead>
              <TableHead>Series#</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characterList.map((character) => (
              <TableRow key={character.id} className=" cursor-pointer">
                <TableCell className="font-medium">{character.name}</TableCell>
                <TableCell>{character.comics.available}</TableCell>
                <TableCell>{character.series.available}</TableCell>
              </TableRow>
            ))}

            {isPending && <TableRowSkeletonComponent />}
            <TableRow>
              <TableCell colSpan={3}>
                <div
                  className="flex w-full justify-center p-2"
                  ref={loadMoreRef}
                >
                  <ChevronDownCircle className="h-6 w-6 animate-bounce" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  },
);

_TableListComponent.displayName = "TableListComponent"; // Add display name

export const TableListComponent = _TableListComponent;
