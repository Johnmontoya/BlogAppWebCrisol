interface Props {
  onChange: (name: string, value: string) => void;
  newsData: any;
  darkMode: boolean;
  isLoading: boolean;
}

const QuoteBlockFields = ({
  onChange,
  darkMode,
  isLoading,
  newsData,
}: Props) => {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <>
      <div className="flex flex-col mb-4">
        <label htmlFor="quoteText" className="mb-2 font-medium">
          Texto de la Cita
        </label>
        <textarea
          id="quoteText"
          name="quoteText"
          onChange={handleFieldChange}
          value={newsData.quoteText}
          required
          placeholder="El texto de la cita..."
          rows={4}
          className={`w-full p-3 border outline-none rounded focus:border-indigo-600 transition-colors ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300"
          }`}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="context" className="mb-2 font-medium">
          Contexto
        </label>
        <input
          id="context"
          type="text"
          name="context"
          onChange={handleFieldChange}
          value={newsData.context}
          required
          placeholder="Contexto o fuente de la cita"
          className={`w-full p-3 border outline-none rounded focus:border-indigo-600 transition-colors ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300"
          }`}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default QuoteBlockFields;
