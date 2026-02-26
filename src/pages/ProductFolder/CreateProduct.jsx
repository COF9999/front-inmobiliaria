import { useEffect, useRef, useState } from "react"
import "../css/createProduct.css"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import FileUpload from "../components/FileUpload";
import axios from 'axios';
import { DialogModal } from "../components/Reutil/ModalAlert";
import { validateNameProduct } from "./ValidationsProduct";
import {baseUrl} from "../../../hostConfig";

export function CreateProduct(){
    const nameProduct = useRef()
    const category = useRef()
    const condition = useRef()
    const description = useRef()
    const price = useRef()
    const inputNameFile = useRef()
    const navigate = useNavigate()
    const [tokenUser,setTokenUser] = useState("")
    const [messageDialog,setMessageDialog] = useState(null)
    
    const categorys = useRef(["","LIBROS","UNIFORME","EQUIPOS","ELECTRONICA"])
    const [nameProductIncompleteRegex,setNameProductIncompleteRegex] = useState("")
    const selectedFile = useRef({
        "file":"",
    })
   

    useEffect(()=>{
        const getToken = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""
        setTokenUser(getToken())
    },[])




    const createProduct = async(e) =>{
       
        if (!selectedFile.current.file) {
            insertMessageDialog("Selecciona una archivo","ERROR")
            return;
        }

        const token = ()=> localStorage.getItem('token')!=null?localStorage.getItem('token'):""

        const formData = new FormData()
        


        formData.append('file',selectedFile.current.file)
        formData.append('newFileName',inputNameFile.current.value!=""?inputNameFile.current.value:"");
        formData.append("category",category.current)
        formData.append("price",price.current.value)
        formData.append("condition",condition.current.value)
        formData.append("name",nameProduct.current.value)
        formData.append("description",description.current.value)
        formData.append("token",token())

        try{
            const response = await axios.post(`${baseUrl}/product/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
             });

             
             if(response.status==200){
                insertMessageDialog('Producto Creado Exitosamente',"SUCCESFULLY")
                window.location.reload()
             }
        }catch(error){
            console.log(error);
            insertMessageDialog(e.data.message,"ERROR")
        }
        
    }

    const deactiveDialog = ()=>{
        setMessageDialog(null)
    }

    const insertMessageDialog = (message,type)=>{
       
        setMessageDialog({
            "message":message,
            "type":type
        })
        
    }
   
    const updateStreamFile = (file) =>{
        if(file!=null){
            selectedFile.current.file = file
        }
    }


    const handleCategory = (event)=>{
        console.log("eenee");
        category.current = event.target.value!=""?event.target.value:null
        console.log(category.current);
    }

    const validateProductNameOnkey = (e)=>{
        if(!validateNameProduct(e.target.value).flat){
            setNameProductIncompleteRegex(validateNameProduct(e.target.value).message)
        }else{
            setNameProductIncompleteRegex("")
        }
    }
    return (
        <>
         <div className="container-principal-create-product">
                <div className="nav-go-to-products-create-products">
                    <Link to="/my-products">Ir a productos</Link>
                </div>
            <div className="container-main-form-create-product">
            <div className="container-form-create-product">
                <div className="box-title-form-create">
                    <h2>Crear</h2>
                </div>
                <div>
                    <label >Cargar imagen</label>
                    <FileUpload
                    insertInFile={updateStreamFile}
                    >
                    </FileUpload>
                    <div>
                    <input
                        type="text"
                        placeholder="nombre de la imagén (Optional)"
                        ref={inputNameFile}
                    />
                </div>
                <div>
                    <label >Nombre del producto</label>
                    <input ref={nameProduct} type="text" onKeyUp={validateProductNameOnkey}/>
                    {
                        nameProductIncompleteRegex==""
                        ?""
                        :<p>{nameProductIncompleteRegex}</p>
                    }
                </div>
                <div>
                    <label>Selecciona una categoría:</label>
                    <select id="categorias" name="categorias" onChange={handleCategory} className="select-category">
                        {
                            categorys.current.map((item,index)=>{
                                return <option key={index} value={item} >{item || "Seleccione una opción"}</option>
                            })
                        }
                    </select>
                </div>
                </div>
                <div>
                    <label >Condición</label>
                    <input ref={condition} type="number" min="1" max="10"/>
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea ref={description} name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <label >Precio</label>
                    <input ref={price} type="number" />
                </div>
                <div>
                    <button className="btn-create-product" onClick={createProduct} >Crear</button>
                </div>
            </div>

            </div>

            {messageDialog!=null
            ?<DialogModal
             setView={deactiveDialog}
             description={messageDialog.message}
             typePopUp={messageDialog.type}
            >
            </DialogModal>
            :""
            }

         </div>
        </>
    )
}