export default function Input({
  type,
  required,
  placeholder,
  defaultValue,
  inputRef,
  onChange,
}) {
  return (
    <input
      className="text-sm shrink grow"
      type={type}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      ref={inputRef}
      onChange={onChange}
    />
  );
}
