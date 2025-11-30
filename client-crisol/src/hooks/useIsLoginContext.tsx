import { useState } from "react";
import token from "../lib/token";
import { ACCESS_TOKEN_KEY } from "../config/config";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useIsLoginContext = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    !!token.getToken(ACCESS_TOKEN_KEY)
  );

  const authToken = token.getToken(ACCESS_TOKEN_KEY);
  const hasValidToken = authToken !== null && authToken !== undefined

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const [role, setRole] = useState(() => {
    const t = token.getToken(ACCESS_TOKEN_KEY);
    if (!t) return null;

    const decoded: any = jwtDecode(t);
    return decoded.role ?? null;
  });

  return {
    axios,
    navigate,
    isLogin,
    setIsLogin,
    authToken,
    hasValidToken,
    role,
    setRole,
    input,
    setInput,
    darkMode,
    setDarkMode,
  };
};

export default useIsLoginContext;
  
  