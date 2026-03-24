import { useCallback, useEffect, useMemo, useState } from "react"
import { getConsult } from "../../consults/axios"
import { TableObjects } from "../../components/pureComponents/component"
import { convertStringDate } from "../../consults/date";
import { formatCurrencyLocal } from "../../consults/numbers";

const TRANSLATE_COLUMS ={
    id: "ID",
    pipelineType: "Tipo de Pipeline",
    userLiquidationId: "ID de userLiquidation",
    amount: "Valor",
    closedAt: "Fecha de Cierre",
    processedAt: "Fecha de Procesamiento",
}
const PROPERTY_COLUMS = ["id","pipelineType","userLiquidationId","amount","closedAt","processedAt"]

export const ProcessDeal = () => {
 
    const [listProcessDeal,setListProcessDeal] = useState([])
    const coverPropertyColumns = useCallback((item)=>(
        <>
            <td>{item["id"]}</td>
            <td>{item["pipelineType"] || "-"}</td>
            <td>{item["userLiquidationId"] || "-"}</td>
            <td>{formatCurrencyLocal(item["amount"]) || "-"}</td> 
            <td>{convertStringDate(item["closedAt"]) || "-"}</td>
            <td>{convertStringDate(item["processedAt"]) || "-"}</td>
        </>
    ),[])

    const listActions = useMemo(()=> [],[])
  
    useEffect(()=>{
      const consult = async ()=>{
              try {
                  const response = await getConsult("/process-deal/list");                 
                  setListProcessDeal(response)
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
              list={listProcessDeal}
              coverPropertyColums={coverPropertyColumns}
              listActions={listActions}
          />
      </div>
    )
}