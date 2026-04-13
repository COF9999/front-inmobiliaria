import { getConsult, postConsult } from "../../../consults/axios"

export const actionDeal= (deal)=>{
  const executeConsult = async (deal)=>{

      const requestBody = {
        dealId: deal.dealUserId,
        typeMethod:"PLAN",
        hubspotEnum:deal.pipelineType.replaceAll(" ", "").toUpperCase(),
        statesObjects:'OPEN'
      }

      
      console.log(requestBody);
      
      try{
        const response = await postConsult("/deal/action-deal",requestBody)
     
        console.log(response.message === "ok");
        
        if(response.message === "ok"){
            alert("Deal registrado")
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