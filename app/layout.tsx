import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { HeadingComponent } from "@/components/HeadingComponent";
import { SideNavigationComponent } from "@/components/SideNavigationComponent";
import { Toaster } from "@/components/ui/sonner";
import { Display, DisplayProvider } from "@/providers/data-display.provider";

const inter = Josefin_Sans({ weight: ["700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel",
  description: "Welcome to Marvel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <DisplayProvider type="table">
        <html lang="en">
          <body className={inter.className}>
            <SideNavigationComponent />

            <HeadingComponent />
            <section className="ml-[105px] mt-20">{children}</section>
            <Toaster className="bg-destructive" />
          </body>
        </html>
      </DisplayProvider>
    </ThemeProvider>
  );
}
