"use client";

import { Character } from "@/model/api.characters.model";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Comics#</TableHead>
            <TableHead>Character#</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
  },
);

_TableListComponent.displayName = "TableListComponent"; // Add display name

export const TableListComponent = _TableListComponent;
