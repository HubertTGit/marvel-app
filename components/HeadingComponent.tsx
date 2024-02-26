'use client';
import { ModeToggle } from './theme.toggler';

export const HeadingComponent = () => (
  <div className="w-full">
    <div className="flex justify-between items-center p-3">
      <h1 className="text-2xl">Marvel</h1>
      <ModeToggle />
    </div>
  </div>
);
