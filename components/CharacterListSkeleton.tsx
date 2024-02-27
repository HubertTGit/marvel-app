'use client';

import { ThumbSkeletonsComponent } from './ThumbSkeletonsComponent';

export const CharacterListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <ThumbSkeletonsComponent />
    </div>
  );
};
