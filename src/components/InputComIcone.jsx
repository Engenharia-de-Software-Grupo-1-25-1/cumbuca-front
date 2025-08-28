export default function InputComIcone({ type, value, onChange, placeholder, icone: Icone, required = false }) {
  return (
    <div className="flex items-center border-b border-gray-400 py-2">
      {Icone && <Icone className="text-gray-600 mr-3" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-600"
        required={required}
      />
    </div>
  );
}
