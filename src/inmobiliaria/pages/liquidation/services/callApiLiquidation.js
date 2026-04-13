import { getConsult, postConsult } from "../../../consults/axios"

export const getDealsNotRegister = async ({objBody,setListOperate,setNoValues})=>{
    try{
        console.log("QUERER LANZAR CONSULTA");
        
        const data = await postConsult("/deal/deals-not-register",objBody) 
        
        if(data.length===0){
             setNoValues(true)
             console.log("BAD RETURN OFF SERVER");
        }else{
           setNoValues(false)
           setListOperate(data)
        }
    }catch(e){
        console.log("Internal Server Error");
        console.log(e);
    }    
};

export const registerDeal= (deal)=>{
  const executeConsult = async (deal)=>{

      const requestBody = {
        dealId: deal.id,
        typeMethod:"",
        hubspotEnum:deal.pipelineType.replaceAll(" ", "").toUpperCase(),
        statesObjects:'OPEN'
      }

      
      console.log(requestBody);
      
      try{
        const response = await postConsult("/deal-register/create",requestBody)
     
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