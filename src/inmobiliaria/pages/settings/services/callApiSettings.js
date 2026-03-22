import { getConsult, postConsult } from "../../../consults/axios"

export const getListGlobalSettings = async (setListGlobalSettings)=>{
            try {
                const response = await getConsult("/g-variables/");                 
           
            if (response) {
                const globalVariablesList = response
                console.log(response);
                
                setListGlobalSettings(globalVariablesList);
            }
            } catch (error) {         
                console.error("Error en la consulta:", error);
            } 
}

export const editGlobalVariable = async (gVariableObject)=>{

        console.log(gVariableObject);
        
        try {
            const response = 10             

        if (response===10) {
            const globalVariablesList = response
            return response
        }
        } catch (error) {         
            console.error("Error en la consulta:", error);
        }
}