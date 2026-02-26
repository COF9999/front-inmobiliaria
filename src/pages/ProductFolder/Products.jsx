import React, { useEffect, useState } from "react";
import imgNotFound from "../../images/imageNotFound.jpg"
import { Link } from "react-router-dom";
import "../css/listProduct.css"
import axios from "axios";
import {baseUrl,baseUrlS3} from "../../../hostConfig";


// <img src={`http://localhost:8080/images/${imgProduct}`} alt="book-loaded" />

function CardProduct({id,nameProduct,descriptionProduct,priceProduct,conditionProduct,imgProduct,isCloudImage}){

    const routeImage = isCloudImage?baseUrlS3:baseUrl+"/images"

    const publicate = async () =>{
        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

        const body ={
            "idProduct":id,
            "tokenDto":{
                "token": token()
            }
        }
       
        try{
            const response = await axios.post(`${baseUrl}/publication/`,body)
            if(response.status === 200){
                console.log(response.data);
                alert("Operación exitosa")
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            alert(e.response.data.message)
        }
    }

    return (
        <>
          <div className="box-card-product">
             <div>
                <div className="box-inner">
                    <h2>{nameProduct}</h2>
                </div>
                <div className="box-inner img">
                     <img src={`${routeImage}/${imgProduct}`} alt="book-loaded" />
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
                    <div className="box-offerter">
                        <button onClick={publicate}>Publicar</button>
                    </div>
                </div>
            </div>
           
        </div>
        </>
    )
}

export function Product(){

    const [products,SetProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async () =>{
                const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

                const body ={
                    "token":token()
                }

                try{
                    const response = await axios.post(`${baseUrl}/product/select`,body)
                    if(response.status === 200){
                        SetProducts(response.data)
                        console.log(response.data);
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
           <div className="container-primary-products">
            <div className="container-principal-list-products">
                <div className="container-div-link-to-create-products">
                    <Link to={"create"}>Crear productos</Link>
                </div>
                <div className="container-list-products">
                   {
                    products.map((item,index) => {
                        return (
                            <CardProduct
                             key={index}
                             id={item.id}
                             nameProduct={item.name}
                             imgProduct={item.img!=null?item.img:""}
                             descriptionProduct={item.description}
                             priceProduct={item.price}
                             conditionProduct={item.condition}
                             isCloudImage={item.isCloudImage}
                            >
                            </CardProduct>
                            )
                    })
                   }
                </div>
            </div>
            
            </div>
        </>
    )
}

// <img src={`https://img-cue-bucket.s3.us-east-2.amazonaws.com/${imgProduct}`} alt="book-loaded" />