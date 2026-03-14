import { nameValidatation } from "../../regularExpressions/RegularExpresions";


export function validateNameProduct(valueInput){
    const valueRegex = nameValidatation().test(valueInput)
    if(valueRegex){
        return {
            "flat":true,
            "message":""
        }
    }else{
        return{
            "flat":false,
            "message":"El nombre debe tener entre 5 y 40 caracteres "
        }
    }
}