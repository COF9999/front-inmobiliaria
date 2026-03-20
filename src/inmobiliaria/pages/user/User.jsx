import { useEffect, useRef, useState } from "react"
import { TableObjects,MenuToggle, Overlay } from "../../components/pureComponents/component"
import { ChangeRoleIcon,ClosePopUp,AddUser } from "../../components/svg/Svg"
import { getListUsers,changeRole } from "./services/callApiUser"
import { extractRoles } from "./services/utilUser"
import { ButtonAction } from "../../components/pureComponents/buttons"
import "../../css/user.css"



const useModal = ()=>{
    const [modals,setModals] = useState({})

    const OpenPromise = (id,extraData={}) =>{          
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
    }

    const ClosePromise = (id,value = null) =>{
        const modal = modals[id]
        if(modal?.resolve) modal.resolve(value) // Aqui desbloquea el await de la promesa
        setModals(prev=>{
            const newState = {...prev}
            delete newState[id]
            return newState
        }
        )
    }

    const getModal = (id) => modals[id] || {isOpen:false}

    return {OpenPromise,ClosePromise,getModal}
}

export const User = () => {
  const {OpenPromise,ClosePromise,getModal} = useModal()  
  const [listUser,setListUser] = useState([])
  const propertyColumns = ["hubId","isActive","name","identification"]
  const fullRoleList = ["ROLE_ADMIN","ROLE_USER"]
  const subListPropertyColums = ["roles"]
  const listActions = [
      {
        "type":"ROLE-CHANGE",
        "svg":ChangeRoleIcon,
        "event": async (item,self) => {

            // Aqui se abre el modal y se queda esperando que llamemos a resolve

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
  
  useEffect(()=>{
     getListUsers(setListUser)
  },[])

  const whichModalIsActive = ['ROLE-CHANGE','ROLE-ADD','ROLE-DELETE'].map(id=> getModal(id)).find(m=> m.isOpen)
  const messageDialog = getModal("MESSAGE")
  const createUserPopUp = getModal("CREATE-USER")

  console.log(createUserPopUp);
  
  
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

        {
            whichModalIsActive 
            &&
             <PopUpActionsRole
                isActive={whichModalIsActive.isOpen}
                typeFilter={whichModalIsActive.typeFilter}
                roleList={whichModalIsActive.listRoleCopy}
                fullRoleList={fullRoleList}
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

    const [valueResultMenuTogge1,setValueResultMenuTogge1]= useState("")
    const [valueResultMenuTogge2,setValueResultMenuTogge2]= useState("")
    const [isActiveMennuTogge1,setIsActiveMenuTogge1] = useState(false)
    const [isActiveMennuTogge2,setIsActiveMenuTogge2] = useState(false)
    let expectedRolesOptions = fullRoleList.map(role=>  ({ label: `${role}`,value: `${role}`}))
    let actualRolesOptions = roleList.map(role=>  ({ label: `${role}`,value: `${role}`}))
    expectedRolesOptions.unshift({ label: "",value: ""})
    actualRolesOptions.unshift({ label: "",value: ""})
    const dataChangeRol = useRef({actualRol:"",newRol:""})
    let contentToRender = {
        header:null,
        content:null
    }
    
    switch (typeFilter) {
        case "ROLE-CHANGE":
            contentToRender.header = "Cambiar Rol"
            contentToRender.content = ChangeRol(
                typeFilter,
                valueResultMenuTogge1,
                setValueResultMenuTogge1,
                valueResultMenuTogge2,
                setValueResultMenuTogge2,
                isActiveMennuTogge1,
                setIsActiveMenuTogge1,
                setIsActiveMenuTogge2,
                isActiveMennuTogge2,
                expectedRolesOptions,
                actualRolesOptions,
                dataChangeRol,
                onComfirm
            )
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

   console.log(isActive);
   

    const contentToRender = {
        header:null,
        content:null
    }
    contentToRender.header = "CREATE-USER"
    contentToRender.content = (
        <form className="user-form"> 
            <div className="form-grid">
            
            <div className="form-section">
                <h3>Datos Personales</h3>
                <div className="field">
                <label htmlFor="name">Nombre Completo</label> {/* htmlFor en lugar de for */}
                <input type="text" id="name" placeholder="Ej. Juan Pérez" />
                </div>
                <div className="field">
                <label htmlFor="identification">Identificación</label>
                <input type="text" id="identification" placeholder="DNI / Cédula" />
                </div>
                <div className="field">
                <label htmlFor="hubId">Hub ID</label>
                <input type="text" id="hubId" placeholder="ID de conexión" />
                </div>
            </div>

            
            <div className="form-section">
                <h3>Acceso y Contacto</h3>
                <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="usuario123" />
                </div>
                <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="correo@ejemplo.com" />
                </div>
                <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="••••••••" />
                </div>
            </div>
            </div>

            <div className="form-section roles-full-width">
            <h3>Asignación de Roles</h3>
            <div className="roles-selection">
                <label className="chip-checkbox">
                <input type="checkbox" name="roles" value="admin" />
                <span>Administrador</span>
                </label>
                <label className="chip-checkbox">
                <input type="checkbox" name="roles" value="editor" />
                <span>Editor</span>
                </label>
                <label className="chip-checkbox">
                <input type="checkbox" name="roles" value="viewer" />
                <span>Lector</span>
                </label>
            </div>
            </div>

            <button type="submit" className="btn-save">Guardar Usuario</button>
        </form>
    )


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

function ChangeRol(
                typeFilter,
                valueResultMenuTogge1,
                setValueResultMenuTogge1,
                valueResultMenuTogge2,
                setValueResultMenuTogge2,
                isActiveMennuTogge1,
                setIsActiveMenuTogge1,
                setIsActiveMenuTogge2,
                isActiveMennuTogge2,
                expectedRolesOptions,
                actualRolesOptions,
                dataChangeRol,
                onComfirm
){
    return(
        <>
         <div className="wrapper-popup-role">
            <div className="row-wrapper">
                    <MenuToggle
                        typeFilter={typeFilter}
                        clasificationValueSelect={()=>{
                             return (valueResultMenuTogge1!=="")
                                    ? valueResultMenuTogge1
                                    :"ROL ACTUAL"
                        }}
                        options={actualRolesOptions}
                        onSelect={(info)=>{
                            dataChangeRol.current.actualRol = info.value
                            setValueResultMenuTogge1(info.value)
                        }}
                        open={isActiveMennuTogge1}
                        setOpen={setIsActiveMenuTogge1}
                        
                />
                <MenuToggle
                        typeFilter={typeFilter}
                        clasificationValueSelect={()=>{
                             return (valueResultMenuTogge2!=="")
                                    ? valueResultMenuTogge2
                                    :"ROL NUEVO"
                        }}
                        options={expectedRolesOptions}
                        onSelect={(info)=>{
                            dataChangeRol.current.newRol = info.value
                            setValueResultMenuTogge2(info.value)
                        }}
                        open={isActiveMennuTogge2}
                        setOpen={setIsActiveMenuTogge2}
                />
            </div>
         </div>
        <div className="container-action-single-role">
            <ButtonAction
                action={()=> onComfirm(dataChangeRol.current)}
            >
                Enviar 
            </ButtonAction>
        </div>
        </>
    )
}

