'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Drama, BookOpenIcon, Boxes } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const SideNavigationComponent = () => {
  const pathname = usePathname();
  return (
    <aside className="">
      <ul className="px-4 flex flex-col gap-2">
        <li>
          <Link
            href="/"
            className={buttonVariants({
              variant: pathname === '/' ? 'default' : 'outline',
            })}
          >
            <Drama className="h-[1.2rem] w-[1.2rem] mr-2" />
          </Link>
        </li>
        <li>
          <Link
            href="creators"
            className={buttonVariants({
              variant: pathname === '/creators' ? 'default' : 'outline',
            })}
          >
            <Boxes className="h-[1.2rem] w-[1.2rem] mr-2" />
          </Link>
        </li>
        <li>
          <Link
            href="comics"
            className={buttonVariants({
              variant: pathname === '/comics' ? 'default' : 'outline',
            })}
          >
            <BookOpenIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
          </Link>
        </li>
      </ul>
    </aside>
  );
};
