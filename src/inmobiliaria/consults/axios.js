import api from "../apiAxios";

export const verifySession = async ()=>{
    const response = await api.get("/api/auth/verify")

    if(response.status == 200){
        const data = response.data;
     
        return data;
    }else{
        console.log("**********ERROR AUTH");
        
        throw new Error("Unauthirized");
    } 
}