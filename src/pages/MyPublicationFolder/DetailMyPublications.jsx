import { useParams } from "react-router-dom"
import { useState,useEffect,useRef } from "react"
import "../css/myPublicationDetail.css"
import axios from "axios"
import imgBook from "../../images/img-book.jpeg"
import iconCloseCommet from "../../images/icon-close-512.webp"
import {baseUrl, baseUrlS3 } from "../../../hostConfig"




function OverlayCounterOffer({activeOverlayCounter,setActiveOverlayCounter,idOfferRef}){

    const textAreaRef = useRef()

    if(activeOverlayCounter==false){
        return
    }

    const deactiveCounterOffer = () =>{
        setActiveOverlayCounter(false)
    }


    const launchCounterOffer = async() =>{
    
        if(textAreaRef.current.value === ""){
            alert("Llena el campo de la contra-oferta")
        }
        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""
        try{
            let body = {
                "idOffer":idOfferRef.current,
                "description": textAreaRef.current.value,
                "tokenDto":{
                    "token": token()
                }
            }
            const response = await axios.post(`${baseUrl}/counter-offer/`,body)
            if(response.status === 200){
                console.log(response.data);
                alert("Contra-oferta exitosa")
            }else{
                alert(e)
                console.log(e);
                console.log("BAD RETURN OFF SERVER TRANSACTION");
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
    <div className="overlay-message-counter-offer">
        <div className="div-content-counter-offer">
            <div>
                <h2>Contra-Ofertar</h2>
            </div>
            <div>
                <textarea name="" id="" cols="30" rows="10" placeholder="especificación contra-oferta"  ref={textAreaRef}></textarea>
            </div>
            <div>
                <button onClick={launchCounterOffer}>Contra-Ofertar</button>
            </div>
            <div className="close-counter-offer" onClick={deactiveCounterOffer}>
                <img src={iconCloseCommet} alt="" />
            </div>
        </div>
    </div>
    )
}

function ImgDetail({name,price,condition,imgMyDetailMyPublication,isCloudImage}){

    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    return(
        <>
            <div className="content-render-img-myPublication --render-div">
                <div className="box-image-myPublication">
                    <div className="box-name-product-myPublication">
                    </div>
                        
                        <img src={`${routeImage}/${imgMyDetailMyPublication}`} alt="#" />
                     </div>
                <div className="box-description-publication">
                    <div>
                        <p>{name}</p>
                    </div>
                    <div>
                        <p>{`Precio: ${price}`}</p>
                    </div>
                    <div>
                        <p>{`Condición: ${condition}`}</p>
                    </div>
                </div>
               
            </div>
        </>
    )
}

function OfferDetail({idSearchProduct}){

    const inputAmount = useRef()
    const [productContent,setProductContent] = useState(null)

    useEffect(()=>{
            const fetchProducts = async () =>{
                try{
                    const response = await axios.get(`${baseUrl}/product/${idSearchProduct}`)
                    if(response.status === 200){
                        console.log(response.data);
                        
                        setProductContent(response.data)
                    }else{
                        console.log("BAD RETURN OFF SERVER");
                    }
                }catch(error){
                    console.log(error);
                }
            }
            fetchProducts()
    },[idSearchProduct])
   

    return(
        <>
             <div className="content-render-offer-myPublication --render-div">
                {
                    productContent!=null
                    ? <div className="box-offer">
                    <div>
                        <img src={`${productContent.isCloudImage?baseUrlS3:baseUrl+"/images"}/${productContent.img}`} alt="" className="img-offer-detail"/>
                    </div>
                   
                     </div>
                :""
                }
               
                {
                    productContent!=null
                    ?<div className="box-info-offer">
                    <div>
                       {`Nombre: ${productContent.name}`}
                    </div>
                    <div>
                            {`Precio: ${productContent.price}`}
                    </div>
                    <div>
                        {`Descripción: ${productContent.description}`}
                    </div>
                    
                    </div>
                    :""
                }
                        
                {/* <div>
                    Operación realizada con exitoso
                </div> */}
             </div>
        </>
    )
}


function CounterOfferDetail({description,status}) {
    
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
        messageStatus.current = "INTERCAMBIADO"
    }
    
    return(<div>
            <div className="div-content-detail-counter-offer">
                <div className={`${colorBox.current}`}>
                    {messageStatus.current}
                </div>
                <div>
                    Descripción
                </div>
                <div>
                    {description}
                </div>
            </div>
    </div>
    )
}
function CounterOffer({stateCounterOffer,counterOffer}){


    if(stateCounterOffer===false || counterOffer.length === 0){
        return
    }
   
    
    return(
        <div className="card-counter-offer">
            <div className="title-detail-counter-offer">
                <h2>Contra-Ofertas</h2>
            </div>
            <div className="flex-box-counter-offer">
                    {
                    counterOffer.map((item,index) =>{
                    return <CounterOfferDetail
                        key={index}
                        description={item.description}
                        status={item.state}
                    />
                })
                }
            </div>
           
        </div>
        
    )
}

function InformationDetail({idOffer,nameOwner,
    condition,owners,
    priceOffer,priceProductOffer,
    idProduct,callBackinsertIdInProduct,
    imgBookOfferted,setIdOfferRef,
    setActiveOverlayCounter
    ,counterOffer,
    isCloudImage
}){

    const [stateCounterOfferInfo,setStateCounterOfferInfo] = useState(false)

    useEffect(()=>{
        const fetchProducts = async () =>{
            try{
                let body = {
                     "idPublication":id,
                      "status":1
                }
                const response = await axios.get(`${baseUrl}/offer/obtain-all-offers`,body)
                if(response.status === 200){
                    console.log(response.data);
                    setOffers(response.data)
                }else{
                    console.log("BAD RETURN OFF SERVER");
                }
            }catch(error){

            }
        }
        fetchProducts()
    },[])


    const selectImg =()=>{
        callBackinsertIdInProduct(idProduct)
    }


    const acceptOffer = async ()=>{
        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""
        try{
            let body = {
                "idOffer":idOffer,
                "tokenDto":{
                    "token": token()
                }
            }
            const response = await axios.post(`${baseUrl}/transaction/`,body)
            if(response.status === 200){
                console.log(response.data);
                alert("Transación exitosa")
            }else{
                alert(e)
                console.log(e);
                console.log("BAD RETURN OFF SERVER TRANSACTION");
            }
        }catch(error){
            console.log(error.response.data.message);
        }
    }

    const activeCounterOffer = () =>{
        setIdOfferRef(idOffer)
        setActiveOverlayCounter(true)
    }

    const activeStateCounterOfferInfo = () =>{
        setStateCounterOfferInfo(!stateCounterOfferInfo)
    }

    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    return(
        <>
            <div className="container-all-info-myPublication">
                <div className="card-offer-my-publication">
                    <div>
                         <h2>{nameOwner}</h2>
                    </div>
                    <div>
                        {
                            imgBookOfferted!=null
                            ?<div>
                                <img src={`${routeImage}/${imgBookOfferted}`} onClick={selectImg}></img>
                                <h2>{`${priceProductOffer} $`}</h2>
                                <h2>{`Estado : ${condition}`}</h2>
                            </div>
                            :""
                        }
                    </div>
                    <div>
                        <h2>{priceOffer!=null?`Valor ofertado \n ${priceOffer} $`: ""}</h2>
                    </div>
                    <div className="group-actions-offer">
                            <div>
                                <h2 className="accept-offer" onClick={acceptOffer}>Aceptar</h2>
                            </div>
                            <div>
                                <h2 className="deny-offer">Rechazar</h2>
                            </div>
                            <div>
                                <h2 className="counter-offer" onClick={activeCounterOffer}>ContraOfertar</h2>
                            </div>
                    </div>
                    
                </div>
                <div className="div-counter-offer-icon" onClick={activeStateCounterOfferInfo}>
                    <div>
                        &#x25BC;
                    </div>
                </div>

               

                <CounterOffer stateCounterOffer={stateCounterOfferInfo}
                counterOffer={counterOffer}
                >

                </CounterOffer>

            </div>
           
            
        </>
    )
}


export function DetailMyPublications(){
    const {id} = useParams()
    const [onePublication,setOnePublication] = useState(null) 
    const [idProduct,setIdProduct] = useState(null)
    const [offers,setOffers] = useState([])
    const [activeOverlayCounter,setActiveOverlayCounter] = useState(false)
    const idOfferRef = useRef()

    useEffect(()=>{
        const fetchProducts = async () =>{
            try{
                const response = await axios.get(`${baseUrl}/publication/${id}`)
                if(response.status === 200){
                    console.log(response.data);
                    setOnePublication(response.data)
                }else{
                    console.log("BAD RETURN OFF SERVER");
                }
            }catch(e){
                console.log(e);
                console.log("Internal Server Error");
            }

            try{
                let body = {
                     "idPublication":id,
                      "status":1
                }
                const response = await axios.post(`${baseUrl}/offer/obtain-all-offers`,body)
                if(response.status === 200){
                    setOffers(response.data)
                }else{
                    console.log("BAD RETURN OFF SERVER");
                }
            }catch(error){

            }
        }
        fetchProducts()
    },[])


    const insertIdInProduct = (id)=>{
        setIdProduct(id)
    }

    const setIdOfferRef = (id) =>{
        idOfferRef.current = id
    }
    return(
            <div className="container-detail-myPublication">
            
                    <div>
                        <div className="container-img-myPublication">
                            {
                                onePublication!=null
                                ? <ImgDetail 
                                 name={onePublication.productResponse.name}
                                 price={onePublication.productResponse.price}
                                 condition={onePublication.productResponse.condition}
                                 imgMyDetailMyPublication={onePublication.productResponse.img}
                                 isCloudImage={onePublication.productResponse.isCloudImage}
                                />
                                :""
                            }
                            {
                                idProduct!=null
                                ?<OfferDetail
                                idSearchProduct={idProduct}
                                />
                                :""
                            }
                        </div>
                        <div className="container-information-myPublication">
                            {
                               
                                offers.map((item,index)=>{

                                    const productOffertedResponse = item.productOffertedResponse

                                  
                                    return <InformationDetail
                                    key={index}
                                    idOffer={item.id}
                                    nameOwner={item.userInformation.name}
                                    priceOffer={item.offerValue}
                                    priceProductOffer={productOffertedResponse!=null?productOffertedResponse.price:""}
                                    condition={productOffertedResponse!=null?productOffertedResponse.condition:""}
                                    idProduct={productOffertedResponse!=null?productOffertedResponse.id:""}
                                    callBackinsertIdInProduct={insertIdInProduct}
                                    imgBookOfferted={productOffertedResponse!=null?productOffertedResponse.img:null}
                                    isCloudImage={productOffertedResponse!=null ? productOffertedResponse.isCloudImage:false}
                                    setIdOfferRef={setIdOfferRef}
                                    setActiveOverlayCounter={setActiveOverlayCounter}
                                    counterOffer={item.counterOfferResponseDtoList}
                                    >
                                        
                                    </InformationDetail>
                                  
                                })
                            }
                            
                        </div>
                    </div>
                
                   <OverlayCounterOffer
                    idOfferRef={idOfferRef}
                    activeOverlayCounter={activeOverlayCounter}
                    setActiveOverlayCounter={setActiveOverlayCounter}
                   ></OverlayCounterOffer>
                   
            </div>
    )
}