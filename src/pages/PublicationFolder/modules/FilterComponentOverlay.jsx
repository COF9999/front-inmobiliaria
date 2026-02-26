import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import "../css/filterCompenentOverlay.css"
import {baseUrl} from "../../../../hostConfig";

export function BannerFilter({partFilter,setAllPublications,setActiveOverlayFilter}){

    if(partFilter===false){
        return
    }

    const filterCategoryDiv = useRef(null)
    const [menuCategoryVisible,setMenuCategoryVisible] = useState(false)
    const [menuPriceVisible,setMenuPriceVisible] = useState(false)
    const [menuValorationVisible,setMenuValorationVisible] = useState(false)
    const inputPriceMinimum = useRef(null)
    const inputPriceMaximum = useRef(null)
    const inputConditionMinimum = useRef(null)
    const inputConditionMaximum = useRef(null)
    const multiConsult = useRef({
        "category":[],
        "price":[],
        "condition":[]
    })

    const filterCategory = (e,menu,func) => {
        const referenceInput = e.target.matches("input")
        let flatEnter = true
        if(e.target.matches("label") || (e.target.name === "category")){
            flatEnter = false
            const $checkBox = e.target
            const consultArray = multiConsult.current;
            if($checkBox.checked){
                consultArray.category.push($checkBox.value)
                console.log(consultArray);
            }else{
                const indexInArray = consultArray.category.indexOf($checkBox.value)
                consultArray.category.splice(indexInArray,1)
                console.log(consultArray);
            }
        }

        if(referenceInput){
            flatEnter = false
        }

        if(flatEnter){
            func(!menu)
        }
                    
    }

    const extractAndCompactValuesInput = (inputMinimun,inputMaximum)=>{
        const valueInputMinimum = inputMinimun.current.value;
        const valueInputMaximum = inputMaximum.current.value;
        if(valueInputMinimum!='' && valueInputMaximum!=''){
            return [parseFloat(valueInputMinimum),parseFloat(valueInputMaximum)]
        }else if(valueInputMinimum == '' && valueInputMaximum==''){
            return "NOT HAPPEND NOTHING"
        }else if((valueInputMinimum != '' && valueInputMaximum=='') || (valueInputMinimum=='' && valueInputMaximum !='')){
            return false
        }
    }

    const setDataInArrayConsult = (value,referenceInConsult) =>{
        let reference = referenceInConsult
        console.log(reference);
        if(value!="NOT HAPPEND NOTHING" && value!= false){
            reference = value
            console.log(reference);
            return reference
        }else if(value=="NOT HAPPEND NOTHING"){
            return []
        }
        else if(value==false){
            alert("Alerta verifica que tienes tus valores de precio y condición completos")
            return []
        }
    }

    const launchMultiConsult = async ()=>{
        const valuePrice = extractAndCompactValuesInput(inputPriceMinimum,inputPriceMaximum)
        const valueCondition = extractAndCompactValuesInput(inputConditionMinimum,inputConditionMaximum)
        multiConsult.current.price = setDataInArrayConsult(valuePrice,multiConsult.current.price)
        multiConsult.current.condition =  setDataInArrayConsult(valueCondition,multiConsult.current.condition)

        let body = multiConsult.current;
        console.log(multiConsult.current);
        try{
            const response = await axios.post(`${baseUrl}/publication/multi-consult`,body)
            if(response.status === 200){
                console.log(response.data);
                setAllPublications(response.data)
                setActiveOverlayFilter(false)
            }else{
                console.log("BAD RETURN OFF SERVER");
            }
        }catch(e){
            console.log("Internal Server Error");
        }
    }

    
    return(
        <div className="container-filter-publication-general" >
        <div className="container-filter child" onClick={(e)=> filterCategory(e,menuCategoryVisible,(menu) => setMenuCategoryVisible(menu))} ref={filterCategoryDiv}>
            <p>Categoria</p>
            <div className={`div-father-list-filters-category ${menuCategoryVisible ? '' : 'active'}`}>

                    <div className="content-input-label-filter-category">
                        <div>
                             <input type="checkbox" name="category" value="LIBROS"/>
                        </div>
                        <div>
                             <label>LIBROS</label>
                        </div>
                    </div>
                    <div className="content-input-label-filter-category">
                        <div>
                          <input type="checkbox" name="category" value="UNIFORME"/>
                        </div>
                        <div>
                          <label>UNIFORME</label><br/>
                        </div>
                    </div>
                    <div className="content-input-label-filter-category">
                        <div>
                            <input type="checkbox" name="category" value="EQUIPOS"/>
                        </div>
                        <div>
                          <label>EQUIPOS</label>
                        </div>
                    </div>
                    <div className="content-input-label-filter-category">
                        <div>
                             <input type="checkbox" name="category" value="ELECTRONICA"/>
                        </div>
                        <div>
                             <label>ELECTRONICA</label>
                        </div>
                    </div>         
            </div>
        </div>
        
        
        <div className="menu container-price child" onClick={(e)=> filterCategory(e,menuPriceVisible,(menu) => setMenuPriceVisible(menu))}>
            <p>Precio</p>
            <div className={`part-2-price-filter ${ menuPriceVisible ? '' : 'active'}`} id="price-menu">
                <div className="inner-price-filter">
                    <input  ref={inputPriceMinimum} type="number" placeholder="Min Price"/>
                </div>
                <div className="inner-price-filter">
                    <input ref={inputPriceMaximum} type="number" placeholder="Max Price"/>
                </div>
               
            </div>
        </div>
        
        <div className="menu container-valoration child" onClick={(e)=> filterCategory(e,menuValorationVisible,(menu) => setMenuValorationVisible(menu))}>
            <p>Condición</p>
            <div className={`part-2-valoration-filter  ${ menuValorationVisible? '' : 'active'}`} id="valoration-menu">
                <div className="inner-box-valoration">
                     <input ref={inputConditionMinimum} type="number" placeholder="Valoration"/>
                </div>
                <div className="inner-box-valoration">
                    <input  ref={inputConditionMaximum}  type="number" placeholder="Valoration"/>
                </div>
            </div>
        </div>

        <div className="box-btn-filter">
            <button onClick={launchMultiConsult}>Consultar</button>
        </div>
       
    </div>
    )
}