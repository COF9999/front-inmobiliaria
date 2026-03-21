import { useEffect, useState } from "react"
import { getConsult } from "../../consults/axios"
import { TableObjects } from "../../components/pureComponents/component"
import { convertStringDate } from "../../consults/date";
import { formatCurrencyLocal } from "../../consults/numbers";

export const ProcessDeal = () => {
 

    const [listProcessDeal,setListProcessDeal] = useState([])
    const propertyColumns = ["id","pipelineType","userLiquidationId","amount","closedAt","processedAt"]
  
    
    useEffect(()=>{
      const consult = async ()=>{
              try {
                  // 1. Agregamos comillas al string del endpoint
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
              coverPropertyColums={(item)=> {
                               return <>
                                    <td>{item["id"]}</td>
                                    <td>{item["pipelineType"] || "-"}</td>
                                    <td>{item["userLiquidationId"] || "-"}</td>
                                    <td>{formatCurrencyLocal(item["amount"]) || "-"}</td> 
                                    <td>{convertStringDate(item["closedAt"]) || "-"}</td>
                                    <td>{convertStringDate(item["processedAt"]) || "-"}</td>
                                  </>
                            }}
              propertyColumns={propertyColumns}
              listActions={[]}
          />
      </div>
    )
}