'use client';
import { ModeToggle } from './theme.toggler';
import { Marvel } from 'next/font/google';

const heading = Marvel({ weight: ['700'], subsets: ['latin'] });

export const HeadingComponent = () => (
  <div className="w-full">
    <div className="flex justify-between items-center p-3">
      <h1 className={`text-2xl ${heading.className}`}>Marvel</h1>
      <ModeToggle />
    </div>
  </div>
);
