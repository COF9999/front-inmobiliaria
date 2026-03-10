import React, { useContext,useEffect,useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; // Asegúrate de ajustar la ruta de importación
import { LoginContext } from "./inmobiliaria/Auth/login";
import "./css/application.css"
import "./css/resize.css"

import logoHabitar from "../assets/habitarr.png"


function NormalSideBar({valueNavHeader}){

    const [selectOptionNav,setSelectOptionNav] = useState()
    const styleSelectOption = "sweet-grey"

    if(valueNavHeader==false){
        return
    }

    const changeSelectValueOption = (key)=>{
        setSelectOptionNav(key)
    }
 
    return(
        <nav className={`nav-options-pages`}>
                       <Link to="/home" className={selectOptionNav===1?styleSelectOption:""} onClick={()=> changeSelectValueOption(1)}>Home</Link>
                   
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
                </div>
    )
}
export function ProtectedRoute(){
    const { isAuth } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const {username} = useContext(AuthContext)
    const [navHeader,setNavHeader] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHeaderBody,setNavHeaderBody] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const exitSesion = () =>{
        logout()
    }


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth <= 1200) {
                setMenuOpen(true);
                setNavHeader(false)
            } else {
                setMenuOpen(false);
                setNavHeader(true)
                setNavHeaderBody(false)
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    });


    return (
        isAuth
        ? <div className="container-application">
            <div className="container-nav-application">
                <div className="div-nav-application-cue">
                    <img src={logoHabitar} alt="cue-img" />
                </div>
                <IconMenuResize
                    valueMenuOpen={menuOpen}
                    toggleMenu={setMenuOpen}
                    navHeaderBody={navHeaderBody}
                    setNavHeaderBody={setNavHeaderBody}
                />

                {/* <NavHeader
                    valueNavHeader={navHeader}
                >
                </NavHeader> */}

                <div className="div-nav-auth">
                    <div className="div-nav-profile">
                        <Link to={"/my-profile"}>@{username}</Link>
                    </div>
                    <div className="div-close-session">   
                     <a onClick={exitSesion}>Cerrar sesión</a>
                    </div>
                </div>
            </div>

            {/* SIDEBAR */}
            <NormalSideBar valueNavHeader={navHeader} />

            <HamburguerSideBar
                setNavHeaderBody={setNavHeaderBody}
                navHeaderBody={navHeaderBody}
            />

            <div className="father-div-content-aplication">
                <Outlet />
            </div>
    </div>
    : <Navigate to="/"></Navigate>
    )
}
