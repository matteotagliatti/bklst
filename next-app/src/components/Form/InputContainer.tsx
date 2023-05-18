interface InputContainerProps {
  children: React.ReactNode;
  hidden?: boolean;
}

export default function InputContainer({
  children,
  hidden,
}: InputContainerProps) {
  let classNames = "flex items-start py-3.5 border-b border-neutral-100";
  if (hidden) {
    classNames += " hidden";
  }

  return <div className={classNames}>{children}</div>;
}