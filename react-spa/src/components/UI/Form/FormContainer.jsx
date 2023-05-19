export default function FormContainer({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:max-w-md mb-12">
      {children}
    </form>
  );
}
