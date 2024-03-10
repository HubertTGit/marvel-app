"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Drama, BookOpenIcon, Boxes } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import marvel from "@/public/marvel.svg";

export const SideNavigationComponent = () => {
  const [showAll, setShowAll] = useState(false);

  const pathname = usePathname();
  return (
    <aside
      onMouseEnter={() => setShowAll(true)}
      onMouseLeave={() => setShowAll(false)}
      className="fixed top-0 z-30 flex h-screen w-[90px] flex-col justify-between bg-slate-600 transition-all hover:w-[250px]"
    >
      <div className="p-3">
        <div className="mb-2 flex w-full justify-center bg-red-500 py-2">
          <Image src={marvel} alt="alt" height={25} />
        </div>

        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href="/"
              className={`w-full ${buttonVariants({
                variant: pathname === "/" ? "default" : "outline",
              })}`}
            >
              <Drama className=" h-[1.2rem] w-[1.2rem]" />
              <span className={showAll ? "ml-2 inline" : "hidden"}>
                Characters
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="creators"
              className={`w-full ${buttonVariants({
                variant: pathname === "/creators" ? "default" : "outline",
              })}`}
            >
              <Boxes className=" h-[1.2rem] w-[1.2rem]" />
              <span className={showAll ? "ml-2 inline" : "hidden"}>
                Creators
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="comics"
              className={`w-full ${buttonVariants({
                variant: pathname === "/comics" ? "default" : "outline",
              })}`}
            >
              <BookOpenIcon className=" h-[1.2rem] w-[1.2rem]" />
              <span className={showAll ? "ml-2 inline" : "hidden"}>Comics</span>
            </Link>
          </li>
        </ul>
      </div>

      <p className="p-3 text-center text-xs">
        <Link href="http://marvel.com" target="_blank">
          © 2024 MARVEL
        </Link>
      </p>
    </aside>
  );
};
