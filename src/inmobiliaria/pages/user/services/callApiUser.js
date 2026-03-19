import { getConsult, postConsult } from "../../../consults/axios"
import { generateId } from "../../../consults/date";
import { extractRoles } from "./utilUser";


export const changeRole = async (item,ObjectRoles,type)=>{
        try {

                if((ObjectRoles==null) && (ObjectRoles.actualRol==ObjectRoles.newRol)){
                    return "El usuario esta asignado el mismo rol"
                }

                const requestBody = {
                    'hubId':item.hubId,
                    'strOldRole':ObjectRoles.actualRol,
                    'strNewRole':ObjectRoles.newRol,
                    'type':type
                }
                const response = await postConsult("/user/change-role",requestBody);                 
            
                if (response) {
                    return response
                }
        } catch (error) {         
              console.error("Error en la consulta:", error);
        } 
    
}

export const getListUsers = async (setListUser)=>{
            try {
                const response = await getConsult("/user/list");                 
           
            if (response && Array.isArray(response)) {
                const userList = response.map(item => item.userRequestDto)
                 .map(user => 
                    ({
                                ...user,
                                id: user.id || generateId()
                                }                  
                        )
                        );
                 setListUser(userList);
            }
            } catch (error) {         
                console.error("Error en la consulta:", error);
            } 
}