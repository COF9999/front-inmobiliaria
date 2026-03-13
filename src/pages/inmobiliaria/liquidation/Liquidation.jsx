import { useEffect, useRef, useState } from "react"
import { FilterSvgLiquidation } from "../pureComponents/svg/Svg";
import { TableObjects,MenuToggle } from "../pureComponents/components/component";
import { useOutletContext } from 'react-router-dom';
import api from "../instances/axios";
import "../css/liquidation.css"

const getDealsNotProccesed = async (valueFilter,setListOperate)=>{

    const requestBody = {
        onlyDay: Number(valueFilter),              // Integer
        year: null,              // Integer
        month: null,               // Integer (0-11 o 1-12 según prefieras)
        startDay: null,             // Integer
        endDay: null,              // Integer
        milesecondsStartDay: null, // Long (representado como Number o BigInt en JS)
        milesecondsEndDay: null 
    }
 
    try{
        const response = await api.post("/deal/deals-not-proccesed",requestBody)
        if(response.status === 200){
            setListOperate(response.data)
            console.log(response.data);
        }else{
            console.log("BAD RETURN OFF SERVER");
        }
    }catch(e){
        console.log("Internal Server Error");
        console.log(e);
    }    
};     


export const Liquidation = () => {
  const [listOperate,setListOperate] = useState([])
  const [componentFilter,setComponentFilter] = useState(false)
  const [valueResultComponentFilter,setValueResultComponentFilter] = useState("")
  const propertyColumns = ["dealname", "amount", "dealstage"];
  const [stateInfoFilter,setStateInfoFilter] = useState({})
  const optionsMenuTogge = [
    { label: "", value: "" },
    { label: "8", value: "8" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "31", value: "31" }
  ];

  useEffect(()=>{
    const typeFilter = stateInfoFilter["filter"]
    const valueFilter = stateInfoFilter["value"]


    if((!typeFilter?.trim()) && (!valueFilter?.trim())){
      return
    }


    switch(typeFilter){
      case "by-days-month": 
        getDealsNotProccesed(valueFilter,setListOperate)
      break;
    }
  },[JSON.stringify(stateInfoFilter)])

          
  
  return (
    <div className="container-primary-liquidation">
        <div className="container-primary-options">
          <div className="content-filter-svg-liquidation">
            <FilterSvgLiquidation></FilterSvgLiquidation>
          </div>
          <div className="content-dinamic-filter-options">
            <MenuToggle
                typeFilter={"by-days-month"}
                valueResultComponentFilter={valueResultComponentFilter}
                setValueResultComponentFilter={value=> setValueResultComponentFilter(value)}
                options={optionsMenuTogge}
                open={componentFilter}
                setOpen={(status)=> setComponentFilter(status)}
                onSelect={info=> setStateInfoFilter(info)}
            /> 
          </div>
        </div>
        <div className="container-body-deals">
           <TableObjects
              list={listOperate}
              setListOperate={(data)=> setListOperate(data)}
              propertyColumns={propertyColumns}
           />
        </div>
    </div>
  )
}