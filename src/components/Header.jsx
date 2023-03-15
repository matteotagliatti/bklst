export default function Header({ user }) {
  const title = "(Basic) Booklist";

  return (
    <div>
      <h1 className="font-medium mb-1 text-neutral-900">
        {user ? user.record.name + "'s " + title : title}
      </h1>
      <p className="text-neutral-500 mb-1">
        {user ? "Your basic booklist" : "A basic booklist"}
      </p>
    </div>
  );
}
