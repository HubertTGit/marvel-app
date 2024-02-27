'use client';

import { ChevronDownCircle } from 'lucide-react';

interface LoadMoreIndicatorComponentProps {
  loading: boolean;
}

export const LoadMoreIndicatorComponent = ({
  loading,
}: LoadMoreIndicatorComponentProps) => {
  return (
    <div className="flex w-full p-2 justify-center">
      <ChevronDownCircle className="h-6 w-6 animate-bounce" />
    </div>
  );
};
