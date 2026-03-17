import { useEffect, useRef, useState } from "react"
import { TableObjects,MenuToggle } from "../../components/pureComponents/component"
import { ChangeRoleIcon,ClosePopUp } from "../../components/svg/Svg"
import { getListUsers,changeRole } from "./services/callApiUser"
import { extractRoles } from "./services/utilUser"
import { ButtonAction } from "../../components/pureComponents/buttons"



const useModal = ()=>{
    const [config,setConfig] = useState({isOpen:false,resolve:null})

    const OpenPromise = ()=>{
        return new Promise((resolve)=>{
            setConfig({
                isOpen:true,
                resolve:resolve // Guarda la referencia de la funcion resolve esperando ser invacada una llave que puede tener valores
            })
        })
    }

    const ClosePromise = (value = null) =>{
        if(config.resolve) config.resolve(value) // Aqui desbloquea el await de la promesa
        setConfig({isOpen:false,resolve:null})
    }

    return {isActiveModal: config.isOpen, OpenPromise,ClosePromise}
}

export const User = () => {
  const {isActiveModal,OpenPromise,ClosePromise} = useModal()  
  const [listUser,setListUser] = useState([])
  const [isActivePopUpAction,setIsActivePopUpActions] = useState(false)
  const propertyColumns = ["hubId","isActive","name","identification"]
  const roleList = ["ROLE_ADMIN","ROLE_USER"]
  const subListPropertyColums = ["roles"]
  const listActions = [
      {
        "type":"change-role",
        "svg":ChangeRoleIcon,
        "event": async (item) => {

            // Aqui se abre el modal y se queda esperando que llamemos a resolve
            const selectedRole = await OpenPromise()

            // Si no se selecciono nada o se cerro el popUp cerramos
            if(!selectedRole) return

            changeRole(item,selectedRole)
        }
      }
    ]
  
  useEffect(()=>{
     getListUsers(setListUser)
  },[])

  return (
    <div className="container-primary-user">
        <TableObjects
            list={listUser}
            propertyColumns={propertyColumns}
            coverPropertyColums={(item)=>{
                    return propertyColumns.map((p,index)=>{
                        const value = item[p];
                         return  (
                            <td key={`cell-${item.id}-${p}`}>
                            {typeof value === "boolean" ? (value ? "Si" : "No") : value}
                            </td>
                        )
                    }  
                    )
                }
            }
            subListPropertyColums={subListPropertyColums}
            subList={(item)=>{

                if(item===null || item["roles"] === null){
                    return null
                }
                const roleArray = extractRoles(item["roles"]).join(",")
                
                return <>
                        <td key={`sub-role-${item.id}`}>{`[${roleArray}]`}</td>
                      </>
            }}
            listActions={listActions}
        />

        <PopUpActions
            isActive={isActiveModal}
            list={roleList}
            onComfirm={(role)=> ClosePromise(role)}
            onCancel={()=> ClosePromise(null)}
        >
                
        </PopUpActions>
    </div>
  )
}


function PopUpActions({isActive,list,onComfirm,onCancel}){

    if(isActive === false ) return null

    const typeFilter = "change-role"
    const [valueResultComponentFilter,setValueResultComponentFilter]= useState("")
    const [isActiveMennuTogge,setIsActiveMenuTogge] = useState(false)
    
    const optionsMenuTogge = list
    .map(role=>  ({ label: `${role}`,value: `${role}`})
    )

    return(
        <div className="overlay">
            
            <div className="content-overlay">
                <div className="header-overlay">
                    <h3>INFO</h3>
                </div>
                <MenuToggle
                        typeFilter={typeFilter}
                        clasificationValueSelect={()=>{
                             return (valueResultComponentFilter!=="")
                                    ? valueResultComponentFilter
                                    :"Opciones"
                        }}
                        options={optionsMenuTogge}
                        onSelect={(info)=>{
                            onComfirm(info.value)
                            setValueResultComponentFilter(info.value)
                        }}
                        open={isActiveMennuTogge}
                        setOpen={setIsActiveMenuTogge}
                        
                />

                 <div className="box-close-overlay">
                        <ButtonAction
                            SvgComponent={ClosePopUp}
                            action={()=> onCancel("")}
                        />
                </div>   
            </div>
            
            
            <div className="box-close-overlay">
                    
            </div>
        </div>
    )


    
}

