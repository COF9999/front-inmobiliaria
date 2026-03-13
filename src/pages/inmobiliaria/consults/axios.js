import api from "../instances/axios";

export const verifySession = async ()=>{
    const response = await api.get("/api/auth/verify")

    if(response.status == 200){
        const data = response.data;
        console.log("BIEN");
        
        return data;
    }else{
        console.log("**********ERROR AUTH");
        
        throw new Error("Unauthirized");
    } 
}