import { createContext, useState } from 'react';

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

  const logout = () => {
    localStorage.removeItem('username')
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, usernameContext, username}}>
      {children}
    </AuthContext.Provider>
  );
};
