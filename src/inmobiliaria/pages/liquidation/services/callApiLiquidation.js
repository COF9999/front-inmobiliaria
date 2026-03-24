import { getConsult, postConsult } from "../../../consults/axios"

export const getDealsNotProccesed = async ({objBody,setListOperate,setNoValues})=>{
    try{
        console.log("QUERER LANZAR CONSULTA");
        
        const data = await postConsult("/deal/deals-not-proccesed",objBody) 
        
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


export const closeSelectDeal= (deal)=>{
  const executeConsult = async (deal)=>{

      const requestBody = {
        dealId: deal.id
      }

      console.log(requestBody);
      

      try{
        const response = await postConsult("/deal/liquidate-select-deal",requestBody)
        if(response.status === 200){
            alert("Liquidación completa")
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