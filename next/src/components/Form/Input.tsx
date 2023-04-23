interface InputProps {
  type: string;
  required: boolean;
  placeholder: string;
  defaultValue?: string;
  inputRef: React.MutableRefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  required,
  placeholder,
  defaultValue,
  inputRef,
  onChange,
}: InputProps) {
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
