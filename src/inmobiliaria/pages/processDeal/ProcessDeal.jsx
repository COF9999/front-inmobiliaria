import { useCallback, useEffect, useMemo, useState } from "react"
import { getConsult } from "../../consults/axios"
import { TableObjects } from "../../components/pureComponents/component"
import { convertStringDate } from "../../consults/date";
import { formatCurrencyLocal } from "../../consults/numbers";

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
      <div className="container-primary-processDeal">
          <TableObjects
              list={listProcessDeal}
              coverPropertyColums={coverPropertyColumns}
              propertyColumns={PROPERTY_COLUMS}
              listActions={listActions}
          />
      </div>
    )
}