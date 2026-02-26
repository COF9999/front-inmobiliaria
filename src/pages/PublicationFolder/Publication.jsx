import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import { BannerFilter } from "./modules/FilterComponent";
import iconCloseGoToGreen from "../../images/icon-close-512.webp"
import filterSearch from "../../images/filter-search.png"
import "../css/publications.css"
import { OverlayFilter } from "./modules/OverlayFilter";
import { localStorageFunction } from "../js/methodsLocalStorage";
import {baseUrl,baseUrlS3} from "../../../hostConfig";




//  
function CardPublications({id,nameProduct,descriptionProduct,priceProduct,conditionProduct,imgPublication,isCloudImage}){

    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    return (
          <div className="box-card-publications">
             <div>
                <div className="box-inner">
                    <h2>{nameProduct}</h2>
                </div>
                <div className="box-inner">
                     <img src={`${routeImage}/${imgPublication}`} alt="book-loaded" />
                </div>
                <div className="box-inner">
                <p>Estado {conditionProduct}</p>
                </div>
                <div className="box-inner">
                    <p>{descriptionProduct}</p>
                </div>
                <div className="box-inner">
                    <p>Precio {priceProduct}</p>
                </div>
                <div className="box-inner">
                    <p>
                        <Link to={`/publications/detail/${id}`}>Ver detalles</Link>
                    </p>
                </div>
            </div>
        </div>
        )
}


function Overlay({statePopUpGreen,popUpSetStatus}){

    const [initPopUpGreen,setInitPopUpGreen] = useState(()=> {
        return localStorage.getItem("popUpGreenFlat")!= ""?localStorage.getItem("popUpGreenFlat"):""
    }
    )

    if(initPopUpGreen === "yes" || statePopUpGreen==null){
        return
    }

    const changeActiveOverlay = ()=>{
        popUpSetStatus(null)
        localStorage.setItem('popUpGreenFlat',"yes")
    }
    return(
        <div className="overlay-green-page">
                <div className="div-content-card-green-page">
                    <div>
                        <p>
                        Ayudanos y ve a economia circular,<br />
                          para ayudarnos a mejorar el medio ambiente
                        </p>
                        <br />
                        <br />
                        <p>Recuerda que si publicas o calificas ganas puntos!</p>
                       
                    </div>
                   <div>
                        <Link to={"/green-page"} className="go-to-green" onClick={changeActiveOverlay}>Ir a la pagina</Link>
                   </div>
                   <div className="div-close-popUp-green-page">
                        <div>
                            <img src={iconCloseGoToGreen} alt="" onClick={changeActiveOverlay}/>
                        </div>
                   </div>
                </div>
        </div>
    )
}




function IconFilterResize({partFilter,setActiveOverlayFilter,activeOverlayFilter}){

    if(partFilter===true){
        return
    }

    return(
        <div className="div-filter-resize-icon-search" onClick={e => setActiveOverlayFilter(!activeOverlayFilter)}>
         <img src={filterSearch} alt="" />
        </div>
    )
}

export function Publication(){
    const [allPublications,setAllPublications] = useState([])
    const [popUpGreen,setPopUpGreen] = useState(true)
    const [stateBannerFilter,setStateBannerFilter] = useState(false)
    const [partFilter,setPartFilter] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [activeOverlayFilter,setActiveOverlayFilter] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth <= 980) {
               setPartFilter(false)
               setStateBannerFilter(true)
            } else {
                setPartFilter(true)
                setStateBannerFilter(false)
                setActiveOverlayFilter(false)
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    });



    useEffect(()=>{
        const fetchProducts = async () =>{
                try{
                    const response = await axios.get(`${baseUrl}/publication/allPublications`)
                    if(response.status === 200){
                        setAllPublications(response.data)
                    }else{
                        console.log("BAD RETURN OFF SERVER");
                    }
                }catch(e){
                    console.log("Internal Server Error");
                }
        }
        fetchProducts()
    },[])

    return(
        <>
           <div className="container-primary-publications">
                <BannerFilter
                    partFilter={partFilter}
                    setAllPublications={setAllPublications}
                ></BannerFilter>
                <IconFilterResize
                    partFilter={partFilter}
                    setActiveOverlayFilter={setActiveOverlayFilter}
                    activeOverlayFilter={activeOverlayFilter}
                >

                </IconFilterResize>
                <div className="container-principal-list-publications">
                    <div className="container-list-publications">
                    {
                        allPublications.map((item,index) => {
                            return (
                                <CardPublications
                                key={index}
                                id={item.id}
                                nameProduct={item.productResponse.name}
                                descriptionProduct={item.productResponse.description}
                                priceProduct={item.productResponse.price}
                                conditionProduct={item.productResponse.condition}
                                imgPublication={item.productResponse.img}
                                isCloudImage={item.productResponse.isCloudImage}
                                >
                                </CardPublications>
                                )
                        })
                    }
                    </div>
                </div>
               
            
            </div>
            <OverlayFilter
                activeOverlayFilter={activeOverlayFilter}
                setActiveOverlayFilter={setActiveOverlayFilter}
                setAllPublications={setAllPublications}
            >
                
            </OverlayFilter>
            <Overlay
               statePopUpGreen={popUpGreen} 
               popUpSetStatus={setPopUpGreen}
            >
            </Overlay>
            

        </>
    )
}