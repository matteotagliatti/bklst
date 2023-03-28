export default function Layout({ children, variant }) {
  let classNames = "mx-auto px-5 py-20 md:w-[800px] md:px-0 md:py-32";
  if (variant === "Home") classNames = "mx-auto px-5 py-20 md:px-20 md:py-32";

  return <main className={classNames}>{children}</main>;
}
