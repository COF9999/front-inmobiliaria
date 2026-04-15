import { getConsult, postConsult, postConsultParams } from "../../../../consults/axios"

export const getPlansFunnelRent = async (candidateMixId)=>{
    const executeConsult = async (candidateMixId)=>{

      const options = {
        params: {
            mixId: candidateMixId 
        }
      }

      try{
          const response = await getConsult("/payment-plan/list",options)
          console.log(response);
          
          return response
      }catch(e){
          console.log("Internal Server Error");
          console.log(e);
      }
  }

  return executeConsult(candidateMixId)
}

export const createPaymentPlan = async(uuid)=>{
  
  const body = {
       uuid:uuid
  }

  try{
          const response = await postConsult("/payment-realized/",body)
          console.log(response);
          if(response!=null){
            alert("Pago realizado")
          }
          
          return response
      }catch(e){
          alert("Ya esta pago")
          console.log(e.message);
      }

  
}