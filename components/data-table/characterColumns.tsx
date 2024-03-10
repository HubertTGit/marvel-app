"use client";

import { Character } from "@/model/api.characters.model";
import { ColumnDef } from "@tanstack/react-table";

export const tableColumns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "comics",
    header: "Available Comics",
  },
  {
    accessorKey: "series",
    header: "Available Series",
  },
];
