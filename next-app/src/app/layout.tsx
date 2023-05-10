import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Header from "@/components/Header";
import SupabaseProvider from "@/app/supabase-provider";

export const metadata = {
  title: "Bklst",
  description: "Book app tracker",
};

interface LayoutProps {
  variant?: "small" | "regular";
  children: React.ReactNode;
}

export default function RootLayout({ children, variant }: LayoutProps) {
  let classNames = "mx-auto px-5 py-20 lg:px-20 lg:py-20";
  if (variant === "small")
    classNames = "mx-auto p-5 lg:w-[800px] lg:px-0 lg:py-20";

  return (
    <html lang="en">
      <SupabaseProvider>
        <body className={inter.className}>
          <Header />
          <main className={classNames}>{children}</main>
        </body>
      </SupabaseProvider>
    </html>
  );
}
