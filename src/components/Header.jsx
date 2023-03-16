export default function Header({ title, subtitle, buttons, user }) {
  return (
    <header className="flex flex-col md:flex-row flex-start md:justify-between">
      <div>
        <h1 className="font-medium mb-1 text-neutral-900">{title}</h1>
        <p className="text-neutral-500 mb-1">{subtitle}</p>
      </div>
      {user ? (
        <>
          {buttons.map((buttonInfo, i) => (
            <button key={i} className="w-fit" onClick={buttonInfo.onClick}>
              {buttonInfo.text}
            </button>
          ))}
        </>
      ) : null}
    </header>
  );
}
