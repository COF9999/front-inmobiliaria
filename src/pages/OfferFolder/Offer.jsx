import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import "../css/offer.css"
import { localStorageFunction } from "../js/methodsLocalStorage.js";
import {baseUrl,baseUrlS3} from "../../../hostConfig";


function CounterOffer({idCounterOffer,description,status,setIdCounterRef}){

    const colorBox = useRef()
    const messageStatus = useRef()
   

    
    if(status===0){
        colorBox.current = "red-offer"
        messageStatus.current = "RECHAZADO"
    }

    if(status===1){
        colorBox.current = "green-offer"
        messageStatus.current = "ACTIVA"
    }

    if(status===3){
        colorBox.current = "blue-offer"
        messageStatus.current = "ACEPTADO"
    }

    const selectCounterOffer = (e) =>{
        if(e.target.checked){
            setIdCounterRef(idCounterOffer)
        }else{
            setIdCounterRef("")
        }
    }

    return(
        <div className="counter-offer-card">
            <div className={`status-my-offer ${colorBox.current}`}>
                    {messageStatus.current}
                </div>
             <div>
                <input type="checkbox" onChange={selectCounterOffer}/>
                <p>{description}</p>
             </div>   
            
        </div>
    )
}

function UserHasStarEventOffer({idOffer,idCounterOffer}){

    const aceptCounterOffer = async() =>{
        const valueIdCounterOffer = idCounterOffer.current
        if(valueIdCounterOffer==undefined || valueIdCounterOffer==""){
            alert("Selecciona una contra-oferta")
            return
        }

    
        const body ={
            "idCounterOffer":valueIdCounterOffer,
            "idOffer":idOffer,
            "tokenDto":{
                "token":localStorageFunction()
            }
        }

        try{
            const response = await axios.post(`${baseUrl}/counter-offer/acept-counter-offer`,body)
            if(response.status === 200){
                console.log(response.data);
                alert("Oferta aceptada")
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            alert(e.response.data.message)
        }
    }

    const denyCounterOffer = async () =>{

        const valueIdCounterOffer = idCounterOffer.current
        console.log(valueIdCounterOffer);
        
        if(valueIdCounterOffer==undefined || valueIdCounterOffer==""){
            alert("Selecciona una contra-oferta")
            return
        }

        console.log(valueIdCounterOffer);


       
    
        const body ={
            "idCounterOffer":valueIdCounterOffer,
            "idOffer":idOffer,
            "tokenDto":{
                "token":localStorageFunction()
            }
        }

        try{
            const response = await axios.put(`${baseUrl}/counter-offer/deny-counter-offer`,body)
            if(response.status === 200){
                console.log(response.data); 
                alert("Rechazo exitoso")
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            console.log(e);
            
            alert(e.response.data.message)
        }
    }

    return(
        <div className="div-btn-counterOffer-select">
            <div>
                <button onClick={aceptCounterOffer}>Aceptar</button>
            </div>
            <div>
                <button onClick={denyCounterOffer}>Rechazar</button>
            </div>
        </div>
    )
}

function CardMyOffer({id,nameProductRequired,
    productExchanged,priceOffer,
    imgProductRequired,statusOffer,
    counterOffer,
    isCloudImage
}){

    const colorBox = useRef()
    const messageStatus = useRef()
    const [activeCounterOffer,setActiveCounterOffer] = useState(false)
    const idCounterOffer = useRef("")
    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    

    if(statusOffer===0){
        colorBox.current = "red-offer"
        messageStatus.current = "RECHAZADO"
    }

    if(statusOffer===1){
        colorBox.current = "green-offer"
        messageStatus.current = "ACTIVA"
    }

    if(statusOffer===3){
        colorBox.current = "blue-offer"
        messageStatus.current = "INTERCAMBIADO"
    }

    const activeListCounterOffer = () =>{
        setActiveCounterOffer(!activeCounterOffer)
    }

    const setIdCounterRef = (idPassed) =>{
        idCounterOffer.current = idPassed;
    }

    
    return (
          <div className="box-card-offer">
             <div>
                <div className={`status-my-offer ${colorBox.current}`}>
                    {messageStatus.current}
                </div>
                <div className="box-inner">
                    <h2>{nameProductRequired}</h2>
                </div>
                <div className="box-inner img">
                    <img src={`${routeImage}/${imgProductRequired}`} alt="book-loaded" />
                </div>
                <div className="box-inner">
                    {
                        statusOffer ===1 && productExchanged!=null
                        ?<p>{`Esperando cambiar por ${productExchanged}`}</p>
                        :""
                    }
                    {
                        productExchanged!=null && statusOffer===3
                        ?<p>{`cambiado por ${productExchanged}`}</p>
                        :""
                    }
                    
                </div>
                <div className="container-counter-offer">
                    <div className="" onClick={activeListCounterOffer}>&#x25BC;</div>
                    {
                        counterOffer.length>0 && activeCounterOffer
                        ?counterOffer.map((item,index)=>{
                            return <CounterOffer
                                key={index}
                                idCounterOffer={item.id}
                                description={item.description}
                                status={item.state}
                                setIdCounterRef={setIdCounterRef}
                            />
                        })
                        :"Click para ver más"
                    }
                </div>
                <div>
                    {
                         counterOffer.length>0
                         ?<UserHasStarEventOffer
                            idOffer={id}
                            idCounterOffer={idCounterOffer}
                         ></UserHasStarEventOffer>
                         :""
                    }
                
                </div>
               
               
                <div className="box-inner">
                    <p>{`Valor Oferta  ${priceOffer==null?"no incluido en la compra":priceOffer}`}</p>
                </div>
            </div>
        </div>
        )
}


export function Offer(){

    const [myOffer,setMyOffer] = useState([])

    useEffect(()=>{
        const fetchProducts = async () =>{
                const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

                const body ={
                    "token": token()
                }

                try{
                    const response = await axios.post(`${baseUrl}/offer/my-offers`,body)
                    if(response.status === 200){
                        setMyOffer(response.data)
                    }else{
                        console.log("BAD RETURN OFF SERVER");
                    }
                }catch(e){
                    console.log(e);
                    console.log("Internal Server Error");
                }
        }
        fetchProducts()
    },[])

    return(
        <div className="container-primary-offer">
            <div className="container-principal-list-offer">
                <div className="container-list-offer">
                    {
                        myOffer.map((item,index)=>{
                        return <CardMyOffer
                                key={index}
                                id={item.id}
                                nameProductRequired={item.publicationData.productResponse.name}
                                imgProductRequired={item.publicationData.productResponse.img}
                                isCloudImage={item.publicationData.productResponse.isCloudImage}
                                productExchanged={item.productOffertedResponse!=null ?item.productOffertedResponse.name:null}
                                priceOffer={item.offerValue}
                                statusOffer={item.state}
                                counterOffer={item.counterOfferResponseDtoList}
                            >
                            </CardMyOffer>
                        })
                    }
                </div>
            </div>
        </div>
        
    )
}