interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormContainer({
  children,
  onSubmit,
}: FormContainerProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:max-w-md mb-12">
      {children}
    </form>
  );
}
