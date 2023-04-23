interface BooksContainerProps {
  children: React.ReactNode;
  cols?: number;
}

export default function BooksContainer({
  children,
  cols,
}: BooksContainerProps) {
  let gridCols = "md:grid-cols-3";
  if (cols === 2) gridCols = "md:grid-cols-2";
  const classNames = `grid grid-cols-1 ${gridCols} gap-4`;

  return <div className={classNames}>{children}</div>;
}
