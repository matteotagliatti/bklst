import "./globals.css";
import Header from "./components/header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Header />
        <main className={classNames}>{children}</main>
      </body>
    </html>
  );
}
