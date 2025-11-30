interface Props {
  onChange: (name: string, value: string) => void;
  contentData: any; 
  darkMode: boolean; 
  isLoading: boolean;
}

const HeroImageFields = ({
  onChange,
  darkMode,
  isLoading,
  contentData,
}: Props) => {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const inputClasses = () => `
        w-full p-3 border outline-none rounded focus:border-indigo-600 transition-colors 
        ${
          darkMode
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300"
        }
    `;

  return (
    <>
      <div className="flex flex-col mb-4">
        <label htmlFor="imageUrl" className="mb-2 font-medium">
          URL de la Imagen
        </label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          onChange={handleFieldChange}
          value={contentData.imageUrl || ""}
          required
          placeholder="https://ejemplo.com/imagen.jpg"
          className={inputClasses()}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-2 font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          onChange={handleFieldChange}
          value={contentData.description || ""}
          required
          placeholder="Descripción de la imagen"
          rows={4}
          className={inputClasses()}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default HeroImageFields;
