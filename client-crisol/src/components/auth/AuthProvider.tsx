import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import axios, { type AxiosInstance } from 'axios';
import { useNavigate, type NavigateFunction } from "react-router-dom";
import toast from 'react-hot-toast';

// Configurar baseURL
axios.defaults.baseURL = import.meta.env.VITE_BASEURL;

interface AuthProviderProps {
  children: ReactNode
}

interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
  image: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interfaz para el valor del contexto
export interface AuthContextType {
  axios: AxiosInstance;
  navigate: NavigateFunction;
  isAuthenticated: boolean;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: () => void;
  logout: () => void;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  fetchBlogs: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [input, setInput] = useState<string>("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('https://backendcrisolideas.onrender.com/api/v1/blog/all');
      data.valid == "success" ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) 
        ? error.message 
        : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  }

  // Verificar autenticación al cargar
  useEffect(() => {
    fetchBlogs();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `${storedToken}`;
    }
  }, []);

  // Sincronizar token con axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, [token]);

  // Función login
  const login = (): void => {
    setIsAuthenticated(true);
  }

  const logout = (): void => {
    setToken(null);
    setIsAuthenticated(false);
  }

  const value: AuthContextType = {
    axios,
    navigate,
    isAuthenticated,
    token,
    setToken,
    login,
    logout,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider