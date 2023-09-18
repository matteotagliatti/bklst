import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  variant?: "small" | "regular";
  children: React.ReactNode;
}

export default function Layout({ children, variant }: LayoutProps) {
  let classNames = "mx-auto px-5 py-20 lg:px-20 lg:py-20";
  if (variant === "small")
    classNames = "mx-auto p-5 lg:w-[800px] lg:px-0 lg:py-20";

  return <main className={`${classNames} ${inter.className}`}>{children}</main>;
}
