'use client';

import { emptyArray } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export const ThumbSkeletonsComponent = () => {
  return emptyArray.map((_, i) => (
    <Skeleton key={i} className="w-[150px] h-[150px] rounded-md"></Skeleton>
  ));
};
