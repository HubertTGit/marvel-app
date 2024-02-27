'use client';
import { ModeToggle } from './theme.toggler';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export const HeadingComponent = () => (
  <div className="fixed left-0 right-0 top-0 bg-background z-10 ml-[90px]">
    <div className="flex justify-between items-center p-3 gap-2">
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 opacity-70" />
        <Input className="pl-[40px]" placeholder="Search Characters... " />
      </div>

      <ModeToggle />
    </div>
  </div>
);
