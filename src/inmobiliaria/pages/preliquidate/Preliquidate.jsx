import { useCallback, useEffect, useMemo, useState } from "react"
import { getConsult } from "../../consults/axios"
import { TableObjects } from "../../components/pureComponents/component"
import { convertStringDate } from "../../consults/date";
import { formatCurrencyLocal } from "../../consults/numbers";
import { LiquidationSvg } from "../../components/svg/Svg";
import { actionDeal } from "./services/callApiPreliquidate";

const TRANSLATE_COLUMS ={
    dealUserId: "ID",
    nameUser: "Agente",
    pipelineType: "Tipo de negocio",
    amount: "Valor",
    closedAt: "Fecha de Cierre",
   // processedAt: "Fecha de Procesamiento",
}
const PROPERTY_COLUMS = ["dealUserId","nameUser","pipelineType","amount","closedAt"]

const LIST_ACTIONS = [
    {
      "svg":LiquidationSvg,
      "event": (deal,self) => actionDeal(deal) 
    }
]

export const Preliquidate = () => {
 
    const [listPreliquidateDeal,setListPreliquidateDeal] = useState([])
    const coverPropertyColumns = useCallback((item)=>(
        <>
            <td>{item["dealUserId"]}</td>
            <td>{item["nameUser"] || "-"}</td>
            <td>{item["pipelineType"] || "-"}</td>
            <td>{formatCurrencyLocal(item["amount"]) || "-"}</td> 
            <td>{convertStringDate(item["closedAt"]) || "-"}</td>
        
        </>
    ),[])

    const listActions = useMemo(()=> [],[])
  
    useEffect(()=>{
      const consult = async ()=>{
              const options = {
                params: {
                    s: 'OPEN' 
                }
              }
              try {
                  const response = await getConsult("/deal-register/",options); 
                  console.log(response);
                  setListPreliquidateDeal(response)
              } catch (error) {         
                  console.error("Error en la consulta:", error);
              } 

      }
       consult()
    },[])

    return (
      <div className="container-primary-processDeal view-animation">
          <TableObjects
              translateColums={TRANSLATE_COLUMS}
              list={listPreliquidateDeal}
              coverPropertyColums={coverPropertyColumns}
              listActions={LIST_ACTIONS}
          />
      </div>
    )
}