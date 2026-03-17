import { useContext,useEffect,useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; 
import { verifySession } from "./consults/axios"; 
import { useQuery } from '@tanstack/react-query';
import "./cssglobal/application.css"
import "./cssglobal/resize.css"


import logoHabitar from "../assets/habitarr.png"


function NormalSideBar({valueNavHeader}){

    const [selectOptionNav,setSelectOptionNav] = useState()
    const styleSelectOption = "sweet-grey"

    if(valueNavHeader==false){
        return
    }

    const changeSelectValueOption = (key)=> setSelectOptionNav(key)
    
 
    return(
        <nav className={`nav-options-pages`}>
                       <Link to="/home" className={selectOptionNav===1?styleSelectOption:""} onClick={()=> changeSelectValueOption(1)}>Home</Link>
                       <Link to="/liquidation" className={selectOptionNav===2?styleSelectOption:""} onClick={()=> changeSelectValueOption(2)}>Liquidation</Link>
                       <Link to="/user" className={selectOptionNav===3?styleSelectOption:""} onClick={()=> changeSelectValueOption(3)}>Usuario</Link> 
                       <Link to="/process-deal" className={selectOptionNav===4?styleSelectOption:""} onClick={()=> changeSelectValueOption(4)}>Negocios cerrados</Link>  
         </nav>
    )
}

function IconMenuResize({valueMenuOpen,toggleMenu,setNavHeaderBody,navHeaderBody}){

    

    if(valueMenuOpen===false){
        return
    }

    
    const changeToogleMenuState = ()=>{
        toggleMenu(!valueMenuOpen)
        setNavHeaderBody(!navHeaderBody)
    }

    return(
        <div className="menu-icon" onClick={changeToogleMenuState}>
            &#9776;
        </div>
    )
}


function HamburguerSideBar ({navHeaderBody,setNavHeaderBody}){

    if(navHeaderBody===false){
        return
    }

    const deactiveNavHeaderBody = () =>{
        setNavHeaderBody(false)
    }

    return(
             <div
                    className="div-menu-resize"
                >
                    <div className="div-link-redirection">
                      <Link to="/home" onClick={deactiveNavHeaderBody}>Home</Link>
                    </div>
                    <div className="div-link-redirection">
                      <Link to="/liquidation" onClick={deactiveNavHeaderBody}>Liquidation</Link>
                    </div>
                </div>
    )
}


function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export function ProtectedRoute() {
  const screenWidth = useWindowSize();
  const { logout, username } = useContext(AuthContext);


  // 1. Validar sesión con TanStack Query
  const { data: authObj, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: verifySession, // Tu función de validación
    retry: false,
    staleTime: 600000, // 10 min
  });

  // 2. Lógica de UI derivada del ancho de pantalla (sin useEffects extra)
  const isMobile = screenWidth <= 1200;
  const [navHeaderBody, setNavHeaderBody] = useState(false);
  const [menuOpen, setMenuOpen] = useState(isMobile);

  if (isLoading) return <p>Cargando aplicación...</p>;

  if (isError || !authObj) return <Navigate to="/" />;
  

  return (
    <div className="container-application">
      <header className="container-nav-application">
        <div className="div-nav-application-cue">
          <img src={logoHabitar} alt="logo" />
        </div>
        
        <IconMenuResize
          valueMenuOpen={menuOpen}
          toggleMenu={setMenuOpen}
          navHeaderBody={navHeaderBody}
          setNavHeaderBody={setNavHeaderBody}
        />

        <div className="div-nav-auth">

            <div className="div-nav-profile">
                    <Link to="/my-profile">@{authObj.username || username}</Link>
            </div> 

            <div className="div-close-session">   
                        <a onClick={()=> logout()}>Cerrar sesión</a>
            </div>
        </div>
      </header>

      <div className="container-content-app">
        {/* Usamos !isMobile para decidir qué sidebar mostrar */}
        <NormalSideBar valueNavHeader={!isMobile} />
        
        <HamburguerSideBar
          setNavHeaderBody={setNavHeaderBody}
          navHeaderBody={navHeaderBody}
        />

        <main className="father-div-content-aplication">
          {/* Pasamos los datos del usuario a todas las rutas hijas */}
          <Outlet context={authObj} />
        </main>
      </div>
    </div>
  );
}