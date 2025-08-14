export default function InputField({ label, error, ...rest }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error ? "border-red-500 ring-red-200" : "ring-blue-200"
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
