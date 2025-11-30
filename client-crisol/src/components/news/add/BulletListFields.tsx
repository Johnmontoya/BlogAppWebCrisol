interface Props {
  onChange: (name: string, value: string) => void;
  contentData: any;
  darkMode: boolean;
  isLoading: boolean;
}

const BulletListFields = ({ onChange, darkMode, isLoading, contentData }: Props) => {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <>
      <div className="flex flex-col mb-4">
        <label htmlFor="points" className="mb-2 font-medium">
          Puntos (separados por comas o saltos de línea)
        </label>
        <textarea
          id="points"
          name="points"
          onChange={handleFieldChange}
          value={contentData.points}
          required
          placeholder="Punto 1, Punto 2, Punto 3..."
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
        <label htmlFor="author" className="mb-2 font-medium">
          Autor
        </label>
        <input
          id="author"
          type="text"
          name="author"
          onChange={handleFieldChange}
          value={contentData.author}
          required
          placeholder="Nombre del autor"
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

export default BulletListFields;
