"use client";

import { emptyArray } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export const TableRowSkeletonComponent = () => {
  return emptyArray.map((_, i) => (
    <TableRow key={i}>
      <TableCell colSpan={3}>
        <Skeleton className=" h-8 w-full "></Skeleton>
      </TableCell>
    </TableRow>
  ));
};
