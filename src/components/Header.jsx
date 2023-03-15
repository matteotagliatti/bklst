export default function Header({ user }) {
  const title = "(Basic) Booklist";

  return (
    <div>
      <h1 className="mb-1 text-neutral-900">
        {user ? user.record.name + "'s " + title : title}
      </h1>
      <p className="text-neutral-500">
        {user ? "Your basic booklist" : "A basic booklist"}
      </p>
    </div>
  );
}
