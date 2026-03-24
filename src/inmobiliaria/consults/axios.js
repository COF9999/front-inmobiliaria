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


export const getConsult = async(uri)=>{
    const response = await api.get(uri)

    if(response.status == 200){
        const data = response.data; 
        return data;
    }else{
        console.log(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
        
        throw new Error(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
    } 
}

export const postConsult = async(uri,body)=>{
    const response = await api.post(uri,body)
    
    if(response.status === 200){
        const data = response.data;
        console.log(data);
        
        return data
    }else{
        console.log(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
        
        throw new Error(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
    } 
}