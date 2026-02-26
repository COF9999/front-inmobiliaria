import React, { createContext, useState, useEffect } from 'react';

// Crea el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(()=>{
    return localStorage.getItem('token')?true:false
  });

  // const [isAuth, setIsAuth] = useState(true)
  const [username,setUsername] = useState(()=>{
    return localStorage.getItem('username')!=""?localStorage.getItem('username'):setIsAuth(false)
  })

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuth(true);
  };

  const usernameContext = (usernameParameter) =>{
    setUsername(usernameParameter)
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username')
    localStorage.removeItem('popUpGreenFlat')
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, usernameContext, username}}>
      {children}
    </AuthContext.Provider>
  );
};
