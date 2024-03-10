"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ModeToggle } from "./theme.toggler";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, LayoutGrid, Table } from "lucide-react";
import { Display, useDisplay } from "@/providers/data-display.provider";

export const HeadingComponent = () => {
  const { displayType, setDisplay } = useDisplay();

  return (
    <div className="fixed left-0 right-0 top-0 z-10 ml-[90px] bg-background">
      <div className="flex items-center justify-end gap-2 p-3">
        <Button
          variant={displayType === Display.table ? "outline" : "default"}
          onClick={() => setDisplay(Display.grid)}
        >
          <LayoutGrid />
        </Button>
        <Button
          variant={displayType === Display.grid ? "outline" : "default"}
          onClick={() => setDisplay(Display.table)}
        >
          <Table />
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform opacity-70" />
          <Input className="pl-[40px]" placeholder="Search Characters... " />
        </div>

        <ModeToggle />
      </div>
    </div>
  );
};
