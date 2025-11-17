import { useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuthContext } from "./auth/AuthProvider";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const { input, setInput } = useAuthContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setInput(inputRef.current.value);
    }
  }

  const onClear = () => {
    setInput('')
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="">

      <div className="text-center">        

        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-100 mx-auto border border-indigo-600 rounded-full overglow-hidden">
          <input
            type="text"
            ref={inputRef}
            placeholder="Buscar blog"
            required
            className="w-40 pl-4 outline-none border-none"
          />
          <button
            type="submit"
            className="p-2 rounded-full hover:scale105 transform-all cursor-pointer hover:text-white hover:bg-indigo-600"
          >
            <BiSearch size={20} />
          </button>
        </form>
      </div>
      
      <div className="text-center">
        {
          input && <button onClick={onClear} className="absolute border font-light mt-6 text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer bg-indigo-600">
          <IoIosCloseCircleOutline size={18} className="text-white"/>
        </button>
        }
      </div>
    </div>
  );
};

export default Header;
