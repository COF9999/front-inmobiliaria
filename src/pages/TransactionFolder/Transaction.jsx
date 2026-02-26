import React,{useEffect,useRef,useState} from "react";
import axios from "axios";
import "../css/transaction.css"
import iconCloseCommet from "../../images/icon-close-512.webp"
import {baseUrl,baseUrlS3} from "../../../hostConfig";


function OverlayComment({idTransactionValue,activeOverlayComment,setActiveOverlayComment}){

    const textAreaRef = useRef()
    const inputValorationRef = useRef() 

    if(activeOverlayComment===false){
        return
    }

    const changeActiveOverlay = async ()=>{
        setActiveOverlayComment(false)
    }

    const launchCommentCreate = async () =>{
        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""
        
        if(inputValorationRef.current.value == "" || textAreaRef.current.value== ""){
            alert("Llena los campos ")
            return
        }

        console.log(inputValorationRef.current.value);
        console.log(idTransactionValue);

         let body ={
            id:null,
            idTransaction:idTransactionValue.current,
            message:textAreaRef.current.value,
            valoration:inputValorationRef.current.value,
            tokenDto:{
                "token":token()
            }
        }

         try{
            const response = await axios.post(`${baseUrl}/commentary/`,body)
            if(response.status === 200){
                alert("exitoso")
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            console.log(e);
            alert(e.response.data.message)
            console.log("Internal Server Error");
        }


    }

    return(
    <div className="overlay-valoration">

        <div className="div-content-commet">
            <div className="normal-div">
                 <h2>Valoración</h2>
            </div>
            <div className="normal-div">
                <textarea name="" id="" cols="30" rows="10" placeholder="comentario"
                    ref={textAreaRef}
                ></textarea>
            </div>
            <div className="normal-div">
            <input type="text" placeholder="califica del 1 al 10" ref={inputValorationRef}/>
            </div>
            <div className="normal-div">
                <button className="btn-submit-valoration" onClick={launchCommentCreate}>Enviar</button>
            </div>
            <div className="div-close-popUp-comment">
                        <div>
                            <img src={iconCloseCommet} alt="" onClick={changeActiveOverlay}/>
                        </div>
            </div>
    </div>
</div>)
}


function Comment({user,commentary,valoration}){
    return(
        <div className="box-inner comment">
                    <h3>{user}</h3>
                    <p>{commentary}</p>
                    <p><label>Valoración : </label>{valoration}</p>
        </div>
    )
}
function GroupComments({commentarySeller,commentaryBidder,activeValoration}){
    

    if(activeValoration===false){
        return
    }

    return(
           <>

           {
                commentarySeller!=null
                ? <Comment
                user={`Vendedor: ${commentarySeller.nameUser}`}
                commentary={commentarySeller.messageValoration}
                valoration={commentarySeller.valoration}
                />
                :null
           }
           {
            commentaryBidder!=null
            ? <Comment
            user={`Comprador: ${commentaryBidder.nameUser}`}
            commentary={commentaryBidder.messageValoration}
            valoration={commentaryBidder.valoration}
            />
            :null
           }
           </>
    )
}

function CardTransaction({id,nameProduct,
    descriptionProduct,priceProduct,
    conditionProduct,img,
    commentarySeller,commentaryBidder,
    setActiveOverlayComment,setIdTransactionRef,
    isCloudImage
    }){

    const [activeValoration,setActiveValoration] = useState(false)
    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    const launchValoration = () =>{
        setActiveOverlayComment(true)
        setIdTransactionRef(id)
    }


    const changeValueActiveValoration = ()=>{
        setActiveValoration(!activeValoration);
    }

    return (
          <div className="box-card-transaction">
             <div>
                <div className="box-inner">
                    <h2>{nameProduct}</h2>
                </div>
                <div className="box-inner img">
                    <img src={`${routeImage}/${img}`} alt="book-loaded" />
                </div>
                <div className="div-icon-show-valorations" onClick={changeValueActiveValoration}>▼</div>
                <GroupComments
                    commentarySeller={commentarySeller}
                    commentaryBidder={commentaryBidder}
                    activeValoration={activeValoration}
                />             
                <div className="box-inner">
                    <div className="box-offerter">
                         <button onClick={launchValoration}>Valorar</button>
                    </div>
                </div>
            </div>
        </div>
        )
}


export function Transaction (){

    const [transactions,setTransactions] = useState([])
    const [activeOverlayComment,setActiveOverlayComment] = useState(false)
    const idTransaction = useRef()

    const setIdTransactionRef = (id) =>{
        idTransaction.current = id
    }

    useEffect(()=>{
        const fetchProducts = async () =>{
                const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

                const body ={
                    "token":token()
                }

                try{
                    const response = await axios.post(`${baseUrl}/transaction/get-all`,body)
                    if(response.status === 200){
                        setTransactions(response.data)
                        console.log(response.data);
                    }else{
                        console.log("BAD RETURN OFF SERVER");
                    }
                }catch(e){
                    console.log("Internal Server Error");
                    console.log(e);
                }
        }
        fetchProducts()
    },[])

    return(
        <div className="container-primary-transaction">
            <div className="container-principal-list-transaction">
                <div>
                  
                </div>
                <div className="container-list-transaction">
                   {
                    transactions.map((item,index) => {
                        return (
                            <CardTransaction
                             key={index}
                             id={item.idTransaction}
                             nameProduct={item.offerResponse.publicationData.productResponse.name}
                             img={item.offerResponse.publicationData.productResponse.img}
                             commentarySeller={item.commentarySeller}
                             commentaryBidder={item.commentaryBidder}
                             setActiveOverlayComment={setActiveOverlayComment}
                             setIdTransactionRef={setIdTransactionRef}
                             isCloudImage={item.offerResponse.publicationData.productResponse.isCloudImage}
                            //  descriptionProduct={item.productResponse.description}
                            //  priceProduct={item.productResponse.price}
                            //  conditionProduct={item.productResponse.condition}
                            //  imgPublication={item.productResponse.img}
                            >
                            </CardTransaction>
                            )
                    })
                   }
                </div>
            </div>
            <OverlayComment
                activeOverlayComment={activeOverlayComment}
                setActiveOverlayComment={setActiveOverlayComment}
                idTransactionValue={idTransaction}
            ></OverlayComment>
        </div>
        
            
    )
}