interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label className="w-28 text-sm text-neutral-400 shrink-0" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
