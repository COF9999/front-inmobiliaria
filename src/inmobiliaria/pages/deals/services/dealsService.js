import { getConsult, postConsult } from "../../../consults/axios"

export const findDealsLiquidateByStatus = async (status)=>{
    const executeConsult = async (status)=>{

      const options = {
        params: {
            s: 'OPEN' 
        }
      }

      try{
        const response = await getConsult("/deal-liquidate/",options)
        console.log(response);
        
        return response
    }catch(e){
        console.log("Internal Server Error");
        console.log(e);
    }
  }

  return executeConsult(status)
}