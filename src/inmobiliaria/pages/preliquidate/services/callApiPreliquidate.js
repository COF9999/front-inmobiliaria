import { getConsult, postConsult } from "../../../consults/axios"

export const actionDeal= (deal)=>{
  const executeConsult = async (deal)=>{

      let typeMethod = "";
      if(deal.pipelineType==="Funnel Sales"){
          typeMethod = "LIQUIDATE" 
      }else{
        typeMethod = "PLAN"
      }

      const requestBody = {
        dealId: deal.dealUserId,
        typeMethod:typeMethod,
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