import { useParams } from "react-router-dom"
import reportIcon from "../../images/report-icon.png"
import closeIconReport from "../../images/icon-close-512.webp"
import iconChat from "../../images/icon-chat.png"
import { useEffect, useRef, useState, Fragment  } from "react"
import mLearningSvg from "../../images/machine-learning.svg"
import axios from "axios"
import "../css/detail.css"
import "../css/selectBox.css"
import { localStorageFunction } from "../js/methodsLocalStorage"
import {baseUrl,baseUrlMicroComment,baseUrlS3,baseUrlMachineLearningPublication} from "../../../hostConfig";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import "./css/chat.css"
import * as Comlink from 'comlink';

const decodeJWT = ()=>{
    const token = localStorageFunction()
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
  
    // Decodificamos el payload de base64 a JSON
    const payload = JSON.parse(atob(parts[1]));
    return payload;
}


function ImgDetail({name,imgDetailPublication,isCloudImage}){

    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    return(
        <>
            <div className="content-render-img-detail">
                <div className="box-name-product-detail">
                    <h2>{name}</h2>
                </div>
                <div className="box-image-detail div-img">
                     <img src={`${routeImage}/${imgDetailPublication}`} alt="#" />
                </div>
            </div>
        </>
    )
}


function OptionProducts({id,name,price,funcOptionSelected,imgProductsOfferted,isCloudImage}){

    const referenceSingleOption = useRef()

    const referenceTitleObserver = useRef()

    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    return(
        <a href="#" className="opcion" ref={referenceSingleOption} onClick={(e)=>{
            funcOptionSelected(e,referenceSingleOption,referenceTitleObserver)
        }}>
        <div className="contenido-opcion">
            <img src={`${routeImage}/${imgProductsOfferted}`} alt=""/>
            <div className="textos" >
                <p className="p-ocult">{id}</p>
                <h2 className="titulo" ref={referenceTitleObserver}>{name}</h2>
                <p className="descripcion">{price}</p>
            </div>
        </div>
        </a>
    )
}
function OfferDetail({id}){

    const inputAmount = useRef(null)
    const referenceSelect = useRef()
    const referenceContentSelect = useRef()
    const referenceOptions = useRef()
    const [myProductsOffer,setMyProductsOffer] = useState([])
    const productHasBeenSelected = useRef(null)

    const offerterPublication = async () =>{

        const valueInputAmount = inputAmount.current.value!=""?inputAmount.current.value:null
        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""
        const idProduct = productHasBeenSelected.current!=null? parseInt(productHasBeenSelected.current):null
        let body = {
            "idPublication":id,
            "idProduct":idProduct,
            "priceOffert":valueInputAmount,
            "tokenDto":{
                "token": token()
            }
        }

        
        try{
            const response = await axios.post(`${baseUrl}/offer/`,body)
            if(response.status === 200){
                alert("Oferta realizada con exito");
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            alert(e.response.data.message)
        }
    }

    const activeSelect = () =>{
        referenceSelect.current.classList.toggle('active')
        referenceOptions.current.classList.toggle('active')
    }

    const optionSelected = (e,referenceSingleOption,referenceTitle) => {
        referenceTitle.current.classList.add('insert-node')
        referenceContentSelect.current.innerHTML = referenceTitle.current.parentElement.parentElement.parentElement.innerHTML
        referenceSelect.current.classList.toggle('active')
        referenceOptions.current.classList.toggle('active')
        productHasBeenSelected.current = referenceSingleOption.current.querySelector(".p-ocult").textContent;
    }

    // Carga de productos del ofetante
    useEffect(()=>{
        const fetchProducts = async () =>{
                const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

                const body ={
                    "token":token()
                }

                try{
                    const response = await axios.post(`${baseUrl}/product/select`,body)
                    if(response.status === 200){
                        setMyProductsOffer(response.data)
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
             <div className="content-render-offer-detail">
             <div className="box-offer">
                    <div>
                        <h3>Monto a ofertar</h3>
                    </div>
                    <div>
                            <input ref={inputAmount} type="text" />
                    </div>
                </div>
                
             <form action="">
                        <div className="selectbox">
                            <div className="select" id="select" ref={referenceSelect} onClick={activeSelect}>
                            <div className="contenido-select" ref={referenceContentSelect}>
                                <h1 className="titulo">Escoge un producto</h1>
                            </div>
                            <span className="material-symbols-outlined">expand_more</span>
                        </div>

                         <div className="opciones" id="opciones" ref={referenceOptions}>
                            {
                                myProductsOffer.map((item,index) =>{
                                    return( 
                                        <OptionProducts
                                         key={index}
                                         id={item.id}
                                         name={item.name}
                                         price={item.price}
                                         funcOptionSelected={optionSelected}
                                         imgProductsOfferted={item.img}
                                         isCloudImage={item.isCloudImage}
                                        >
                                        </OptionProducts>
                                    )
                                })
                              
                            }
                    </div>
                </div>
                <input type="hidden" name="pais" id="inputSelect" value=""/>

                </form>
                <div className="div-btn-offer">
                     <button onClick={offerterPublication}>OFERTAR</button>
                 </div>   


                {/* Mensaje correcto */}
                {/* <div>
                    Operación realizada con exitoso
                </div> */}
             </div>
        </>
    )
}

function InformationDetail({nameOwner,condition,price,description}){
    return(
            
                <div className="container-description">
                    <div className="description-basic">
                        <div>
                            <h3>Dueño</h3>
                            <p>{nameOwner}</p>
                        </div>
                        <div>
                            <h3>Precio</h3>
                            <p>{price}</p>
                        </div>
                        <div>
                            <h3>Estado</h3>
                            <p>{condition}</p>
                        </div>
                        <div>
                            <h3>Descripción</h3>
                            <p className="p-description"> {description}</p>
                        </div> 
                    </div>
                </div>
    )
}



export function Overlay({idPublication,activeOverlay,changeVisorActiveOverlay}){

    if (activeOverlay == null || idPublication==null) {
        return null
    };

    const textAreaRef = useRef()

    const changeActiveOverlay = ()=>{
        changeVisorActiveOverlay(null)
    }

    
    const sendReport = async()=>{

        if (textAreaRef.current.value === ""){
            return null
        }
        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

        let body = {
            "idPublication":idPublication,
             "message": textAreaRef.current.value,
             "tokenDto":{
                "token":token()
             }
        }
        try{
            const response = await axios.post(`${baseUrl}/denuciations/`,body)
            if(response.status === 200){
                changeActiveOverlay()
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            alert(e.response.data.message)
            changeActiveOverlay()
        }
        
    }


    return(
        <div className="overlay">
                <div className="div-content-card-report">
                    <div>
                        <h2>Escribe tu denuncia</h2>
                    </div>
                   
                   <div>
                        <textarea name="" id="" cols="1" rows="1" ref={textAreaRef}>

                        </textarea>
                   </div>

                   <div>
                        <button onClick={sendReport}>Enviar</button>
                   </div>
                   <div className="div-close-popUp-report">
                        <div>
                            <img src={closeIconReport} alt="" onClick={changeActiveOverlay}/>
                        </div>
                   </div>
                </div>
        </div>
    )
}



///////////////////////----

function CardMessage({message,idUserToken,colorPalet}){

    let colorTextWriter;
    let margin;
    let bkgColor;

  
    if(idUserToken==message.userResponseDto.idUser){
      colorTextWriter = colorPalet[0].style
      colorPalet[0].value = true
      colorPalet[0].owner = message.userResponseDto.idUser
      margin = "margin-right"
      bkgColor = "green-cht-basic"
    }else{
      for(let i = 1; i<Object.keys(colorPalet).length-1;i++){ 
        if(colorPalet[i].owner== message.userResponseDto.idUser){
            colorTextWriter = colorPalet[i].style
            break
        }else if(colorPalet[i].value === false){
            colorTextWriter = colorPalet[i].style;
            colorPalet[i].value = true;
            colorPalet[i].owner = message.userResponseDto.idUser
            break
        }
      }
    }
  
    return(
      <div className='wrapper-message-chat-socket'>
          <div className={`message-chat-socket ${margin} ${bkgColor}`}>
              <div className='info-writer-chat-socket'>
                <p className={`text-writer-chat-socket ${colorTextWriter}`}>~ {message.userResponseDto.name}</p>
              </div>
              <div className='box-content-text-message'>
                <p>{message.message}</p>
              </div>
          </div>
      </div>
     

    )
}
  
function IterateCardMessage({chat,idUserToken}){

const colorClassesRef = useRef(
    {
        "0":{
            "style": "emerald-400",
            "value": false,
            "owner":""
        },
        
        "1": {
            "style": "yellow-400",
            "value": false,
            "owner":""
        },
    
    
        "2": {
            "style": "blue-400",
            "value": false,
            "owner":""
        },
    
    
        "3": {
            "style": "purple-400",
            "value": false,
            "owner":""
        },
    
    
        "4": {
            "style": "pink-400",
            "value": false,
            "owner":""
        },
    
    
        "5": {
            "style": "orange-400",
            "value": false,
            "owner":""
        },
    
    
        "6": {
            "style": "red-400",
            "value": false,
            "owner":""
        }
    }

)



if(Object.keys(chat).length === 0 || chat["commentResponseDto"].length === 0){
    return
}


return(
    <Fragment>
    {
        chat.commentResponseDto.map(message=> <CardMessage
        colorPalet={colorClassesRef.current}
        key={message.id}
        message={message}
        idUserToken={idUserToken}
        />)
    }
    </Fragment>
)
}
  
function BarSendMessage({idUserToken,sendMessage}){

    const textCampusRef = useRef()

    const launchMessage = async ()=>{

        try{

                const token = localStorageFunction()
                
                const body =  {
                    "token": token
                }
                const response = await axios.post(`${baseUrl}/security/token-is-valid`,body)

                // if(response.status === 200 && response.data){
                //     if(userInformation.identification === decodeJWT().sub){
                //         refColorCard.current = "myComment"
                //     }
                // }else{
                    
                // }
            }catch(e){
                localStorage.removeItem('token')
            }
        
        
        
        sendMessage(
        textCampusRef,idUserToken
        )
    }

return(
    <div className='box-send-message-chat-socket box-send-message-1'>
        <input ref={textCampusRef} type="text" />
        <button onClick={()=> launchMessage()}>Enviar</button>
    </div>
    
)
}
  
function App({setVisualizateContentChap,idPublication,idUserToken}) {
    const url = `${baseUrlMicroComment}/chat-socket`
    const [stompClient,setStompClient] = useState(null)
    const [chat,setChat] = useState({})
    const init = useRef(false)
    const [sockJs,setSockJs] = useState(new SockJS(url))
    //const refInputText = useRef()
    const scrollableRef = useRef(null);
    
    const initMessages = async ()=>{
        if(init.current){
            return
        }  
     
        init.current = true
        try{
          const response = await axios.post(`${baseUrlMicroComment}/chat/list/${idPublication}`)
          setChat(response.data)
          console.log(response.data);
          init.current = true
        }catch(e){
          console.log("Error",e);
        }
      
    }

   
    const deactiveChap = () =>{
        setVisualizateContentChap(false)
    }
  
   
    useEffect(()=>{
      initMessages()
      const client = Stomp.over(sockJs);
      
      client.debug = () => {};

      // Creamos la conexión al broker con la room
      client.connect({},()=>{
        client.subscribe(`/topic/${idPublication}`,(objMessage)=>{
          const newMessageObj = JSON.parse(objMessage.body)
          setChat((prevObjMessage)=>{
            let instanceBefore = structuredClone(prevObjMessage)
            instanceBefore.commentResponseDto.push(newMessageObj)
            return instanceBefore
          })
        },{idPublication: idPublication})
      }, (error)=>{
          console.log("Error Web Socket");
      })
  
      setStompClient(client)
  
      return () => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log('Desconectado del WebSocket');
            });
        }
      }
    },[])

    useEffect(()=>{
        const scrollableElement = scrollableRef.current;        
        if (scrollableElement) {
          scrollableElement.scrollTop = scrollableElement.scrollHeight;
        }
    },[chat])
  
  
    const sendMessage = (textCampusRef,idUserToken)=>{
      try{
        if(stompClient.connect){
            console.log(textCampusRef.current.value);
            const messageObj = {
                "message":textCampusRef.current.value,
                "idUser":idUserToken
            }
            stompClient.send(`/app/chat/${idPublication}`,{},JSON.stringify(messageObj))
            textCampusRef.current.value = ""
          }
      }catch(e){
            console.log(e);
      } 
      
    }
  
    return (
      <Fragment>
       <div className='main-chat-socket'>
                <section className='section-chat-socket'>
                    <div className='panel-chat-socket panel-1' >
                        <div className='chat-chat-socket chat-1 scrollable' ref={scrollableRef}>
                            <IterateCardMessage
                            chat={chat}
                            idUserToken={idUserToken}
                            />
                        </div>
                     <BarSendMessage
                         sendMessage={sendMessage}
                         idUserToken={idUserToken}
                    />
                    </div>
                    <div onClick={()=>setVisualizateContentChap(false)} className="closeChat"> X
                    </div>
            </section>
       </div>
      </Fragment>    
    )
  }

  


//////////////////////


export function Detail(){
    const {id} = useParams()
    const [onePublication,setOnePublication] = useState(null) 
    const [visualizationOverlay,setVisualizationOverlay] = useState(null)
    const [visualizateContentChap,setVisualizateContentChap] = useState(false)
    const idUserToken = decodeJWT().sub
    const [matchIdealProduct,setMatchIdealProduct] = useState("")
    const [error, setError] = useState(null);

    const getValueMatchMachineL = async (publication) => {
        const product = publication.productResponse;
        const body = {
            id: String(idUserToken),
            category: product.category,
            price: product.price,
            condition: product.condition,
        };

        const fetchWorkerMachinePub = new Worker(new URL('./scripts/fetchWorker.js', import.meta.url), { type: 'module' });

        fetchWorkerMachinePub.postMessage({
            baseUrlMachineLearningPublication,
            body,
        });

        fetchWorkerMachinePub.onmessage = (event) => {
            const { success, result, error } = event.data;
            if (success) {
                setMatchIdealProduct(result.match)
            } else {
                console.log('Error:', error);
            }
            fetchWorkerMachinePub.terminate();
        };

        fetchWorkerMachinePub.onerror = (e) => {
            console.error('Error en el Web Worker:', e.message);
            fetchWorkerMachinePub.terminate();
        };
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/publication/${id}`);
                if (response.status === 200) {
                    setOnePublication(response.data);
                    getValueMatchMachineL(response.data);
                } else {
                    console.log('BAD RETURN FROM SERVER');
                }
            } catch (e) {
                console.log('Internal Server Error');
                setError('Internal Server Error');
            }
        };

        fetchProducts();
    }, []);


    const launchPopUpDenunciation = () =>{
        setVisualizationOverlay(true)
    }

    const activeChapt = () =>{
        setVisualizateContentChap(!visualizateContentChap)
    }
    return(
        <>
           
                {
                    onePublication!=null
                    ?<div className="container-detail-publication">
                        <div className="container-img-offer">
                                <ImgDetail 
                                    name={onePublication.productResponse.name}
                                    imgDetailPublication={onePublication.productResponse.img}
                                    isCloudImage={onePublication.productResponse.isCloudImage}
                                />
                                    
                               
                                <OfferDetail id={onePublication.id}/>
                        </div>
                        <div className="container-information-detail">
                            <InformationDetail
                                nameOwner={onePublication.userInformation.name}
                                condition={onePublication.productResponse.condition}
                                price={onePublication.productResponse.price}
                                description={onePublication.productResponse.description}
                                onePublication={onePublication}
                            />
                             <div className="container-actions-detail-publication">
                                    <div className="div-m-learning --content-div-icon">
                                        <div className="inner-div-icon-machine-l">
                                            <img src={mLearningSvg} alt="" />
                                        </div>
                                        {
                                            matchIdealProduct===""
                                            ?null
                                            :   <div className="div-match-score">
                                                         <p>{"Ideal: "+matchIdealProduct+"%"}</p>
                                                 </div> 
                                        }
                                    </div>
                                    <div className="div-denunciation --content-div-icon">
                                        <div className="inner-div-icon" onClick={launchPopUpDenunciation}>
                                            <img src={reportIcon} alt="report-icon" />
                                        </div>
                                    </div>
                                    <div className="div-chapt --content-div-icon">
                                            <div className="inner-div-icon" onClick={activeChapt}>
                                                <img src={iconChat} alt="Icon-Chat"/>
                                            </div>
                                    </div>
                             </div>
                            
                        </div>
                    </div>
                    :""
                }
            <Overlay
                idPublication={onePublication!=null?onePublication.id:null}
                activeOverlay={visualizationOverlay}
                changeVisorActiveOverlay={setVisualizationOverlay}
            />

            {
                onePublication!=null && visualizateContentChap != false
                ? <App
                setVisualizateContentChap={setVisualizateContentChap}
                idPublication={onePublication!=null?onePublication.id:null}
                idUserToken={idUserToken}
                />
                :""
            }        
        </>
    )
}