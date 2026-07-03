interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function FormField({ label, value, onChange, type = "text" }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-display text-2xl uppercase text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md bg-white px-4 py-3 text-xl text-gray-800 outline-none focus:ring-4 focus:ring-white/60"
      />
    </div>
  );
}

export default FormField;