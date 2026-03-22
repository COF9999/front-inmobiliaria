import { useCallback, useState } from "react"
import { EditValues } from "../../../components/pureComponents/component"

export const EditGlobalVariables = ({item,onComfirm})=>{

    const [valueInput,onChangeInput] = useState("");

    const doEdit = useCallback(()=>{
        onComfirm({
            key:item.key,
            value:valueInput
        })
    },[valueInput])
    
    
    return(
        <EditValues
            valueInput={valueInput}
            onChangeInput={onChangeInput}
            keyParam={item["key"]}
            nameAction={"Actualizar"}
            doEdit={doEdit}
        />
    )
}