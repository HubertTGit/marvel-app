'use client';

import { LibraryBig, BookMarked, MessageCircleMore } from 'lucide-react';

interface LinkIconComponentProps {
  type?: 'detail' | 'wiki' | 'comiclink';
}

export const LinkIconComponent = ({ type }: LinkIconComponentProps) => {
  type = type || 'detail';

  return (
    (type === 'comiclink' && <LibraryBig className="h-4 w-4" />) ||
    (type === 'wiki' && <BookMarked className="h-4 w-4" />) || (
      <MessageCircleMore className="h-4 w-4" />
    )
  );
};
