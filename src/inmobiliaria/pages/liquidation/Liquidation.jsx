import { useEffect, useRef, useState } from "react"
import { FilterSvgLiquidation,RestoreTrashIcon,LiquidationSvgClose } from "../../components/svg/Svg.jsx";
import { TableObjects,MenuToggle } from "../../components/pureComponents/component.jsx";
import { ButtonAction } from "../../components/pureComponents/buttons.jsx";
import { RangeCalendar } from "../../components/externalComponents/Calendar.jsx";
import { WrapperUniqueFilter } from "../../components/pureComponents/component.jsx";
import { convertStringDate } from "../../consults/date";
import { formatCurrencyLocal } from "../../consults/numbers";
import api from "../../apiAxios.js"
import "../../css/liquidation.css"



const getDealsNotProccesed = async ({objBody,setListOperate,setNoValues})=>{
    try{
        const response = await api.post("/deal/deals-not-proccesed",objBody)
        if(response.status === 200){
          const data = response.data;
            if(data.length === 0){
              setNoValues(true)
            }else{
              setNoValues(false)
            }
            setListOperate(data)
        }else{
            console.log("BAD RETURN OFF SERVER");
        }
    }catch(e){
        console.log("Internal Server Error");
        console.log(e);
    }    
};


const closeSelectDeal= (deal)=>{
  const executeConsult = async (deal)=>{

      const requestBody = {
        dealId: deal.id
      }

      console.log(requestBody);
      

      try{
        const response = await api.post("/deal/liquidate-select-deal",requestBody)
        if(response.status === 200){
            alert("Liquidación completa")
        }else{
            console.log("BAD RETURN OFF SERVER");
        }
    }catch(e){
        console.log("Internal Server Error");
        console.log(e);
    }
  }

  executeConsult(deal)
  
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
  const subListPropertyColums = ["dealname", "amount","closedate"]
  const propertyColumns = ["id","ownerId","pipelineType"]
  const [stateInfoFilter,setStateInfoFilter] = useState({})
  const [noValues,setNoValues] = useState(false)
  const [isActivePopUpFilter,setIsActivePopUpFilter] = useState(false)

 
  const optionsMenuTogge = [
    { label: "", value: "" },
    { label: "8", value: "8" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "31", value: "31" }
  ];

  const listActions = [
    {
      "svg":LiquidationSvgClose,
      "event": (deal,self) => closeSelectDeal(deal) 
    }
  ]

  const pageActions = 
     {
      "svg": FilterSvgLiquidation,
      "event": (state) => setIsActivePopUpFilter(state) 
    }

  const resetFilter = {
    "svg": RestoreTrashIcon,
     "event": () => setStateFullFilter()
  }  
  

  useEffect(()=>{
    const typeFilter = stateInfoFilter["filter"]
    const valueFilter = stateInfoFilter["value"]


    if((!typeFilter?.trim()) && (!valueFilter?.trim())){
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
  },[JSON.stringify(stateInfoFilter)])


  useEffect(()=>{ 
    if(valueResultComponentFilter==""){
      setListOperate([])
    }
  },[valueResultComponentFilter])

  

  const setStateFullFilter = ()=>{
      setValueResultComponentFilter("")
      setStateInfoFilter("")
  }
  
  return (
    <div className="container-primary-liquidation">
        <div className="container-primary-options">
          <div className="content-filter-svg-liquidation">
            <ButtonAction
              SvgComponent={pageActions.svg}
              action={()=> pageActions.event(!isActivePopUpFilter)}
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
                options={optionsMenuTogge}
                open={componentFilter}
                setOpen={(status)=> setComponentFilter(status)}
                onSelect={info=> {
                    setStateInfoFilter(info)
                    setValueResultComponentFilter(info.value)
                  }
                }
              
              />}
              ComponentB={<ButtonAction
                   SvgComponent={resetFilter.svg}
                   action={()=> resetFilter.event()}
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
                   SvgComponent={resetFilter.svg}
                   action={()=> resetFilter.event()}
                />  
              }
            />
          </div>
          
          
        </div>
        <div className="container-body-deals">
           <TableObjects
              list={listOperate}
              subListPropertyColums={subListPropertyColums}
              propertyColumns={propertyColumns}
             coverPropertyColums={(item) => {
                  return propertyColumns.map((property) => {
                    const value = item[property];
                    return (
                      <td key={`cell-${item.id}-${property}`}> {/* Key única por celda */}
                        {typeof value === "boolean" ? (value ? "Si" : "No") : value}
                      </td>
                    );
                  });
              }}
              listActions={listActions}
              subList={(item)=> {
                 return <>
                        <td key={`sub-name-${item.id}`}>{item.properties["dealname"]}</td>
                        <td key={`sub-amount-${item.id}`}>{formatCurrencyLocal(item.properties["amount"])}</td>
                        <td key={`sub-date-${item.id}`}>{convertStringDate(item.properties["closedate"])}</td>
                    </>
              }}
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