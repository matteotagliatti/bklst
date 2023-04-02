export default function BooksContainerInner({ children }) {
  return (
    <div className="grid md:col-span-2 grid-cols-1 lg:grid-cols-2 gap-4">
      {children}
    </div>
  );
}
