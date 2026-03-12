import { createContext, useEffect, useState } from 'react';
import api from './inmobiliaria/instances/axios';
// Crea el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(false);

  // const [isAuth, setIsAuth] = useState(true)
  const [username,setUsername] = useState(()=>{
    return localStorage.getItem('username')!=""?localStorage.getItem('username'):setIsAuth(false)
  })

  const [loading,setLoading] = useState(true);

  
  useEffect(()=>{
    const verifySession = async ()=>{
      try{
          const response = await api.post("/")

          if(response.status == 200){
            const data = response.data;
            setIsAuth(true)
            setUsername(data.username)
          }
      }catch(error){
        setIsAuth(false)
      }finally{
        setLoading(false)
      }
    }

    verifySession()
  },[])

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
