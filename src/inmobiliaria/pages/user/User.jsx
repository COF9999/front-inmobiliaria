import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { TableObjects, Overlay } from "../../components/pureComponents/component"
import { ChangeRoleIcon,AddUser } from "../../components/svg/Svg"
import { getListUsers,changeRole } from "./services/callApiUser"
import { extractRoles } from "./services/utilUser"
import { CreateUserJsx } from "./subModals/userEdit"
import { ChangeRol } from "./subModals/role"
import "../../css/user.css"

const PROPERTY_COLUMS = ["hubId","isActive","name","identification"]
const FULL_ROLE_LIST = ["ROLE_ADMIN","ROLE_USER"]
const SUBLIST_PROPERTY_COLUMS = ["roles"]

const useModal = ()=>{
    const [modals,setModals] = useState({})

    const OpenPromise = useCallback((id,extraData={}) =>{          
        return new Promise((resolve)=>{ 
            setModals(prev=>({
                ...prev,
                [id]:{
                    isOpen:true,
                    resolve, ///  // Guarda la referencia de la funcion resolve esperando ser invocada una llave que puede tener valores
                    ...extraData
                }
            }))
        })
    },[])

    const ClosePromise = useCallback((id,value = null) =>{
        const modal = modals[id]
        
        if(modal?.resolve===undefined){
            return
        }else{
            modal.resolve(value) // Aqui desbloquea el await de la promesa
            setModals(prev=>{
            const newState = {...prev}
            delete newState[id]
            return newState
        }
        )
        }
    },[modals])

    const getModal = useCallback((id) => modals[id] || {isOpen:false},[modals])

    return {OpenPromise,ClosePromise,getModal}
}

export const User = () => {
  const {OpenPromise,ClosePromise,getModal} = useModal()  
  const [listUser,setListUser] = useState([])
  const coverPropertyColumns = useCallback((item)=>(
    PROPERTY_COLUMS.map((p)=>{
                        const value = item[p];
                         return  (
                            <td key={`cell-${item.id}-${p}`}>
                            {typeof value === "boolean" ? (value ? "Si" : "No") : value}
                            </td>
                        )
                    }  
  )),[])

  const subList = useCallback((item)=>{
    if(item===null || item["roles"] === null){
                    return null
                }
    const roleArray = extractRoles(item["roles"]).join(",")
    
    return <>
            <td key={`sub-role-${item.id}`}>{`[${roleArray}]`}</td>
            </>
  },[])

  const listActions = useMemo(()=> 
        [
      {
        "type":"ROLE-CHANGE",
        "svg":ChangeRoleIcon,
        "event": async (item,self) => {

            const extractRoles = (listRoles) => listRoles.map(role => role.name);
                        
            const objectRoles = await OpenPromise(self.type,{
                typeFilter:self.type,
                listRoleCopy:extractRoles(item["roles"])
            })
            
            // Si no se selecciono nada o se cerro el popUp cerramos
            if(objectRoles === null ||  !Object.values(objectRoles).every(val => val && val.trim() !== "")) return

            const data = await changeRole(item,objectRoles,self.type)
            
            if(typeof data === "object"){
                await OpenPromise("MESSAGE",{
                    fullInfo:{
                        id:"MESSAGE",
                        position:"top",
                        bgd:false,
                        header: "Mensaje",
                        body: "Cambio existoso de rol"
                    }
                })
            }
        }
      },
      {
        "type":"CREATE-USER",
        "svg":AddUser,
        "event": async (item,self) => {
            
            const objectUser = await OpenPromise(self.type,{id:self.type})

            if(objectUser === null) return 

            console.log(objectUser);
            
        }
      },

    ]
  ,[OpenPromise]) 

  const whichModalIsActive = ['ROLE-CHANGE','ROLE-ADD','ROLE-DELETE'].map(id=> getModal(id)).find(m=> m.isOpen)
  const messageDialog = getModal("MESSAGE")
  const createUserPopUp = getModal("CREATE-USER")  
  
  useEffect(()=>{
     getListUsers(setListUser)
  },[])
    
  return (
    <div className="container-primary-user">
        <TableObjects
            list={listUser}
            propertyColumns={PROPERTY_COLUMS}
            subListPropertyColums={SUBLIST_PROPERTY_COLUMS}
            coverPropertyColums={coverPropertyColumns}
            subList={subList}
            listActions={listActions}
        />

        {
            whichModalIsActive 
            &&
             <PopUpActionsRole
                isActive={whichModalIsActive.isOpen}
                typeFilter={whichModalIsActive.typeFilter}
                roleList={whichModalIsActive.listRoleCopy}
                fullRoleList={FULL_ROLE_LIST}
                onComfirm={(role)=> ClosePromise(whichModalIsActive.typeFilter,role)}
                onCancel={()=> ClosePromise(whichModalIsActive.typeFilter,null)}
            />
        }

        <PopUpMessageDialog
           isActive={messageDialog.isOpen}
           fullInfo={messageDialog.fullInfo}
           onCancel={()=> ClosePromise(messageDialog.fullInfo.id,null)}
        />

        <PopUpCreateUser
            isActive={createUserPopUp.isOpen}
            onCancel={()=> ClosePromise(createUserPopUp.id,null)}
        /> 
    </div>
  )
}


function PopUpActionsRole({isActive,typeFilter,roleList,fullRoleList,onComfirm,onCancel}){    
    if(isActive == false ) return null

    const expectedRolesOptions = fullRoleList.map(role=>  ({ label: `${role}`,value: `${role}`}))
    const actualRolesOptions = roleList.map(role=>  ({ label: `${role}`,value: `${role}`}))
    expectedRolesOptions.unshift({ label: "",value: ""})
    actualRolesOptions.unshift({ label: "",value: ""})
    let contentToRender = {
        header:null,
        content:null
    }
    
    switch (typeFilter) {
        case "ROLE-CHANGE":
            contentToRender.header = "Cambiar Rol"
            contentToRender.content = <ChangeRol
                typeFilter={typeFilter}
                actualRolesOptions={actualRolesOptions}
                expectedRolesOptions={expectedRolesOptions}
                onComfirm={onComfirm}
            />
            break;
        default:
            break;
    }


    return(
        <Overlay
            nameHeader={contentToRender.header}
            content={contentToRender.content}
            onCancel={onCancel}
        />
    )  
}

function PopUpCreateUser({isActive,onCancel}) {

   if(isActive==false) return 

    const contentToRender = useMemo(()=>(
        {
        header:null,
        content:null
        }
    ),[])

    contentToRender.header = "CREATE-USER"
    contentToRender.content = CreateUserJsx()


  return (
    <Overlay
        nameHeader={contentToRender.header}
        content={contentToRender.content}
        onCancel={onCancel}
    /> 
  ); 
}


function PopUpMessageDialog({isActive,fullInfo,onCancel}){

 if(isActive==false) return

   const content = <h3>{fullInfo.body}</h3> 
   return(
        <Overlay
            bgd={fullInfo.bgd}
            position={fullInfo.position}
            nameHeader={fullInfo.header}
            content={content}
            onCancel={onCancel}
        />
    )  
}



