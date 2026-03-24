import { useCallback, useEffect, useRef, useState } from "react"
import { FilterSvgLiquidation,RestoreTrashIcon,LiquidationSvgClose } from "../../components/svg/Svg.jsx";
import { TableObjects,MenuToggle } from "../../components/pureComponents/component.jsx";
import { ButtonAction } from "../../components/pureComponents/buttons.jsx";
import { RangeCalendar } from "../../components/externalComponents/Calendar.jsx";
import { WrapperUniqueFilter } from "../../components/pureComponents/component.jsx";
import { convertStringDate } from "../../consults/date";
import { formatCurrencyLocal } from "../../consults/numbers";
import api from "../../apiAxios.js"
import "../../css/liquidation.css"
import {getDealsNotProccesed,closeSelectDeal} from "./services/callApiLiquidation.js"

const PROPERTY_COLUMS = ["id","nameUser","pipelineType"]
const SUBLIST_PROPERTY_COLUMS = ["dealname", "amount","closedate"]
const COLUMN_TRANSLATIONS = {
  id: "Id Negocio",
  nameUser: "Nombre de Usuario",
  pipelineType: "Tipo de Pipeline",
  dealname: "Nombre del Trato",
  amount: "Monto",
  closedate: "Fecha de Cierre"
};
const OPTIOSFILTERBYDAYS = [
    { label: "", value: "" },
    { label: "8", value: "8" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "31", value: "31" }
];
const LIST_ACTIONS = [
    {
      "svg":LiquidationSvgClose,
      "event": (deal,self) => closeSelectDeal(deal) 
    }
]

const PAGE_ACTIONS = 
     {
      "svg": FilterSvgLiquidation,
      "event": (state) => setIsActivePopUpFilter(state) 
    }

    


function PopUpFilterAction({isActive,setIsActive}){
  if(isActive==false){
    return
  }

  return(
    <div>
      <p>Hola</p>
    </div>
  )

}


export const Liquidation = () => {
  const [listOperate,setListOperate] = useState([])
  const [componentFilter,setComponentFilter] = useState(false)
  const [valueResultComponentFilter,setValueResultComponentFilter] = useState("")
  const [stateInfoFilter,setStateInfoFilter] = useState({})
  const [noValues,setNoValues] = useState(false)
  const [isActivePopUpFilter,setIsActivePopUpFilter] = useState(false)
  
  const coverPropertyColumns = useCallback((item)=>(
    PROPERTY_COLUMS.map((p)=>(
      <td key={`cell-${item.id}-${p}`}>
        {typeof item[p] === "boolean" 
         ? (item[p] ? "Si" : "No") 
         : item[p]
         }
      </td>
    ))
  ),[])
  
  const renderSubList = useCallback((item) => (
    <>
      <td key={`sub-name-${item.id}`}>{item.properties["dealname"]}</td>
      <td key={`sub-amount-${item.id}`}>{formatCurrencyLocal(item.properties["amount"])}</td>
      <td key={`sub-date-${item.id}`}>{convertStringDate(item.properties["closedate"])}</td>
    </> 
  ),[])

  const RESET_FILTER = useCallback(()=>(
    {
    "svg": RestoreTrashIcon,
     "event": () => setStateInfoFilter({filter:"",value:""})
    }
  ),[])


  useEffect(()=>{
  
    if(stateInfoFilter.filter === "" || Object.keys(stateInfoFilter).length === 0){
      if(stateInfoFilter.filter === ""){
        setListOperate([])
      }
      return
    }
     
    const typeFilter = stateInfoFilter["filter"]
    const valueFilter = stateInfoFilter["value"]

     if(typeFilter==="" && valueFilter === ""){
      setListOperate([])
      return
    }
    
    switch(typeFilter){
      
      
      case "by-days-month": 
          getDealsNotProccesed({
            objBody:{onlyDay:Number(valueFilter)},
            setListOperate: setListOperate ,
            setNoValues: setNoValues
          })          
      break
      case "between-days-month": 
          getDealsNotProccesed({
              objBody:{
                dateOne: valueFilter.dateOne,                  
                dateSecond: valueFilter.dateSecond,              
             },
            setListOperate: setListOperate,
            setNoValues: setNoValues
          })          
      break
    }
  },[stateInfoFilter])

  useEffect(()=>{
    getDealsNotProccesed({
            objBody:{onlyDay:30},
            setListOperate: setListOperate ,
            setNoValues: setNoValues
          })
    
   setValueResultComponentFilter(30)
  },[])
  
  
  return (
    <div className="container-primary-liquidation view-animation">
        <div className="container-primary-options">
          <div className="content-filter-svg-liquidation">
            <ButtonAction
              SvgComponent={PAGE_ACTIONS.svg}
              action={()=> PAGE_ACTIONS.event(!isActivePopUpFilter)}
            ></ButtonAction>
          </div>
          <div className="content-dinamic-filter-options">

            <WrapperUniqueFilter
              ComponentA={<MenuToggle
               typeFilter={"by-days-month"}
                clasificationValueSelect={()=>{
                   return (typeof valueResultComponentFilter!=="object" && valueResultComponentFilter!=="")
                    ? `${valueResultComponentFilter} dias`
                    :"Opciones"
                }}
                valueResultComponentFilter={valueResultComponentFilter}
                setValueResultComponentFilter={value=> setValueResultComponentFilter(value)}
                options={OPTIOSFILTERBYDAYS}
                open={componentFilter}
                setOpen={(status)=> setComponentFilter(status)}
                onSelect={info=> {
                    setStateInfoFilter(info)
                    setValueResultComponentFilter(info.value)
                  }
                }
              
              />}
              ComponentB={<ButtonAction
                   SvgComponent={RESET_FILTER().svg}
                   action={()=> RESET_FILTER().event()}
              />
                        
              }
            />

            <WrapperUniqueFilter
            ComponentA={<RangeCalendar
                   typeFilter={"between-days-month"}
                   onSelect={info=> {
                    setStateInfoFilter(info)
                    setValueResultComponentFilter(info.value)
                  }}
                   value={valueResultComponentFilter}
              />
            }
               ComponentB={<ButtonAction
                   SvgComponent={RESET_FILTER.svg}
                   action={()=> RESET_FILTER.event()}
                />  
              }
            />
          </div>
          
          
        </div>
        <div className="container-body-deals">
           <TableObjects
              list={listOperate}
              translateColums={COLUMN_TRANSLATIONS}
              coverPropertyColums={coverPropertyColumns}
              subList={renderSubList}
              listActions={LIST_ACTIONS}
              noValues={noValues}
           />
        </div>

        <PopUpFilterAction
          isActive={isActivePopUpFilter}
          setIsActive={(state)=> setIsActivePopUpFilter(state)}
        />
    </div>
  )
}