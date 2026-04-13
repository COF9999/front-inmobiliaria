import { useContext,useEffect,useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { verifySession } from "./consults/axios"; 
import { useQuery } from '@tanstack/react-query';
import { UserMenu } from "./components/pureComponents/UserMenu";
import { NavLink, useLocation } from 'react-router-dom';
import "./cssglobal/application.css"
import "./cssglobal/resize.css"


import logoHabitar from "../assets/habitarr.png"


function NormalSideBar({ valueNavHeader }) {
    const location = useLocation();
    const styleSelectOption = "sweet-grey";

    // Estado para expandir el submenú de Negocios
    // Se inicializa en true si ya estamos en una ruta de /deals
    const [isDealsOpen, setIsDealsOpen] = useState(location.pathname.includes('/deals'));


     useEffect(() => {
        if (location.pathname.includes('/deals')) {
            setIsDealsOpen(true);
        } else {
            setIsDealsOpen(false);
        }
    }, [location.pathname]);

    if (valueNavHeader === false) {
        return null;
    }

    // Función auxiliar para aplicar tu clase de estilo si la ruta está activa
    const getClassName = ({ isActive }) => isActive ? styleSelectOption : "";

    return (
        <nav className="sidebar">
            <NavLink to="/home" className={getClassName}>Home</NavLink>
            <NavLink to="/user" className={getClassName}>Usuarios</NavLink>
            <NavLink to="/liquidation" className={getClassName}>Liquidaciones</NavLink>

            {/* Sección Expandible: Negocios */}
            <div className="nav-group-container">
                <NavLink 
                    to="/deals" 
                    className={`nav-item-parent ${getClassName}`}
                    onClick={() => setIsDealsOpen(true)} // Forzamos la apertura al hacer click
                >
                     <span>Negocios</span>
                </NavLink>    
                
                {isDealsOpen && (
                    <div className="nav-sub-options" style={{ paddingLeft: '15px', display: 'flex', flexDirection: 'column' }}>
                        <NavLink to="/deals/funnel-sale" className={getClassName}>
                           <span>Ventas</span>
                        </NavLink>
                        <NavLink to="/deals/funnel-rent" className={getClassName}>
                             <span>Rentas</span>
                        </NavLink>
                    </div>
                )}
            </div>

            <NavLink to="/preliquidate" className={getClassName}>Registros</NavLink>
            <NavLink to="/settings" className={getClassName}>Configuración</NavLink>
        </nav>
    );
}
 
function IconMenuResize({valueMenuOpen, setNavHeaderBody, navHeaderBody}){

    // if(valueMenuOpen===false){
    //     return null
    // }
    
    const changeToogleMenuState = ()=>{
        setNavHeaderBody(!navHeaderBody)// navHeaderBody se vuelve true para mostrar menu
    }

    return(
        <div className="nav-icon-hamburguer" onClick={changeToogleMenuState}>
            &#9776;
        </div>
    )
}


function HamburguerMenu ({navHeaderBody,setNavHeaderBody}){

    if(navHeaderBody===false){
        return
    }

    const deactiveNavHeaderBody = () =>{
        setNavHeaderBody(false)
    }

    return(
             <div className="div-menu-resize">

                    <div className="div-link-redirection">
                      <Link to="/home" onClick={deactiveNavHeaderBody}>Home</Link>
                    </div>

                    <div className="div-link-redirection">
                      <Link to="/liquidation" onClick={deactiveNavHeaderBody}>Usuarios</Link>
                    </div>

                    <div className="div-link-redirection">
                      <Link to="/liquidation" onClick={deactiveNavHeaderBody}>Liquidaciones</Link>
                    </div>

                    <div className="div-link-redirection">
                      <Link to="/liquidation" onClick={deactiveNavHeaderBody}>Negocios Cerrados</Link>
                    </div>

                    <div className="div-link-redirection">
                      <Link to="/liquidation" onClick={deactiveNavHeaderBody}>Configuración</Link>
                    </div>
              </div>
          )
}

function useWindowSize() { //hook personalizado
  const [size, setSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export function ProtectedRoute() {

  const navigate = useNavigate();
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
  
  if (isLoading) return <p>Cargando aplicación...</p>;

  if (isError || !authObj) return <Navigate to="/" />;

  return (
    <div className="container-application">

        {/* SIDEBAR (siempre visible a la izquierda) */}
        <NormalSideBar />

        {/* BLOQUE DERECHO (navbar + contenido) */}
        <div className="right-area">

              <header className="container-navbar">
                  <div className="nav-logo">
                    <img src={logoHabitar} alt="logo" />
                  </div>

                    <IconMenuResize
                      // valueMenuOpen={isMobile}
                      navHeaderBody={navHeaderBody}
                      setNavHeaderBody={setNavHeaderBody}
                    />

                  <div className="nav-auth">

                      <div className="div-nav-profile">
                        <Link to="/my-profile">{username || authObj.username}</Link>
                      </div> 

                      <div className="div-close-session">   
                          <UserMenu 
                            logout={logout}
                            navigate={navigate}
                            user={{ name: authObj.username || username }}
                          />
                      </div>

                  </div>
              </header>
        

              <div className="container-content-app">
                  {/* Usamos !isMobile para decidir qué sidebar mostrar */}
                  {/* <NormalSideBar valueNavHeader={!isMobile} /> */}
                  {/* <NormalSideBar/> */}
                  
                  <HamburguerMenu
                    setNavHeaderBody={setNavHeaderBody}
                    navHeaderBody={navHeaderBody}
                  />

                  <main className="father-div-content-aplication">
                    {/* Pasamos los datos del usuario a todas las rutas hijas */}
                    <Outlet context={authObj} />
                  </main>
              </div>
         </div>  
    </div>
  );
}