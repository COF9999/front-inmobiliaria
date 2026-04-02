import { createContext, useState } from 'react';
import { baseUrl } from '../../hostConfig';

// Crea el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(false);

  const [username,setUsername] = useState(()=>{
    return localStorage.getItem('username')
  })

  const login = (boolean)=>{
    setIsAuth(boolean);
  }

  const usernameContext = (usernameParameter) =>{
    setUsername(usernameParameter)
  }

  // const logout = () => {
  //   localStorage.removeItem('username')
  //   setIsAuth(false);
  // };

  const logout = async () => {
  try {
    await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // CLAVE para enviar la cookie
    });

    localStorage.removeItem('username');
    setIsAuth(false);

  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, usernameContext, username}}>
      {children}
    </AuthContext.Provider>
  );
};
