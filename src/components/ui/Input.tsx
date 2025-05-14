export default function Input({
  onChange,
  placeholder,
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded"
        onChange={onChange}
      />
    </div>
  );
}
