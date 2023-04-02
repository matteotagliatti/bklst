export default function Layout({ children, variant }) {
  let classNames = "mx-auto px-5 py-20 lg:px-20 lg:py-20";
  if (variant === "small")
    classNames = "mx-auto px-5 py-20 lg:w-[800px] lg:px-0 lg:py-20";

  return <main className={classNames}>{children}</main>;
}
