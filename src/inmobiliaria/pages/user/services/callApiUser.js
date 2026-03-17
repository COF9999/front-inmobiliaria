import { getConsult, postConsult } from "../../../consults/axios"
import { generateId } from "../../../consults/date";
import { extractRoles } from "./utilUser";


export const changeRole = async (item,role)=>{
    console.log(item,"-",role);
    try {

            if(item["roles"].length == 1){
                const isEqualRole = extractRoles(item["roles"]).some(roleFound=> roleFound===role)
                return "El usuario esta asignado el mismo rol"
            }

            const requestBody = {
                'hubId':item.hubId,
                'roleToChange':role
            }
            const response = await postConsult("/user/list",requestBody);                 
           
            if (response) {
               
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