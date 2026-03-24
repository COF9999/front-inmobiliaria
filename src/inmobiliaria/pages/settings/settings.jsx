import {useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getListGlobalSettings,editGlobalVariable } from "./services/callApiSettings";
import { TableObjects } from "../../components/pureComponents/component"
import { EditIcon } from "../../components/svg/Svg";
import { SpinnerLoadingData } from "../../components/pureComponents/Spinners";
import { EditGlobalVariables } from "./submodals/g_variable";
import { Overlay } from "../../components/pureComponents/component";
import "../../css/settings.css"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms))

const VIEWS_CONFIG = {
    1: {
        Component: GlobalVariable,
        title: "Variables Globales",
        subtitle: "Gestión de entorno",
        extraProps: { type: "admin", showAudit: true } 
    }
};

const G_VARIABLE = {
    "EDIT-G-VARIABLE":{
        component:EditGlobalVariables,
        title: "Editar variables globales"
    }
}

const promiseSettings = ()=>{
    const [configPromise,setConfigPromise] = useState({})

    const OpenPromise = useCallback((id,extradaData)=>{
        return new Promise((resolve)=>{
            setConfigPromise(prev=>(
                {
                    ...prev,
                    [id]:{
                        idModal:id,
                        isActive:true,
                        resolve:resolve,
                        ...extradaData
                    }
                }
            ))
        })
    },[])

    const ClosePromise = useCallback((id,value)=>{
        const modalFound = getModal(id)

        if(modalFound?.resolve===undefined){
            return
        }else{
            modalFound.resolve(value) // Aqui desbloquea el await de la promesa
            setConfigPromise(prev=>{
                const newState = {...prev}
                delete newState[id]
                return newState
             }
        )
        }
    },[configPromise])

    const getModal = useCallback((id) => configPromise[id] || {isActive:false},
    [configPromise])

    return {OpenPromise,ClosePromise,getModal,typeSubModal:configPromise.type}

}

export function Settings(){
    const [isActiveFocusNavItem,setIsActiveFocusNavItem] = useState({id:null,typeClass:"settings-navActive"})
    const [headerContent,setHeaderContent] = useState({header:"Gestiona la app",subtitle:"DashBoard Dinamico"})
    const [loading,setLoading] = useState(false)
    const currentView = VIEWS_CONFIG[isActiveFocusNavItem.id]
    const {getModal,ClosePromise,OpenPromise} = promiseSettings()

    const popUpGvariable = getModal("EDIT-G-VARIABLE")
    const messageDialog = getModal("MESSAGE")
     
    return (
    <div className="settings-page view-animation">
        <div className="settings-mainContainer">
        
            {/* Subcontenedor Izquierdo: Navegación Estática */}
            <aside className="settings-sidebar">
                <div className="settings-sidebarHeader">
                <h3 className="settings-sidebarTitle">Configuración</h3>
                </div>
                
                <nav className="settings-navStack">
                <div className="settings-sectionLabel">Cuenta</div>
                {/* Combinación de clase base y clase activa */}
                <div className={`settings-navItem ${isActiveFocusNavItem.id===1 && isActiveFocusNavItem.typeClass}`} onClick={()=> setIsActiveFocusNavItem(prevState=>({...prevState,id:1}))}>
                    <i className="settings-icon">🌍</i> Variables Globales
                </div>
                <div className={`settings-navItem ${isActiveFocusNavItem.id===2 && isActiveFocusNavItem.typeClass}`} onClick={()=> setIsActiveFocusNavItem(prevState=>({...prevState,id:2}))}>
                    <i className="settings-icon">🔒</i> Seguridad
                </div>
                <div className={`settings-navItem ${isActiveFocusNavItem.id===3 && isActiveFocusNavItem.typeClass}`} onClick={()=> setIsActiveFocusNavItem(prevState=>({...prevState,id:3}))}>
                    <i className="settings-icon">🔔</i> Notificaciones
                </div>
                </nav>
            </aside>

            {/* Subcontenedor Derecho: Contenido Dinámico */}
            <main className="settings-contentCanvas">
                <header className="settings-contentHeader">
                    <h2 className="settings-contentTitle">{headerContent.header}</h2>
                    <p className="settings-contentSubtitle">{headerContent.subtitle}</p>
                </header>

                <section className="settings-dynamicArea">
            

                {loading && <SpinnerLoadingData />}

            
                {currentView ? (
                    <div style={{ display: loading ? 'none' : 'block' }}>
                        <currentView.Component 
                            setLoading={setLoading}
                            setHeaderContent={setHeaderContent}
                            OpenPromise={OpenPromise}
                        />
                    </div>
                ) : (
                    <div className="settings-placeholder">
                        <p>Selecciona una opción del menú para comenzar</p>
                    </div>
                )}
                </section>
            </main>
        </div>
         {
         popUpGvariable.isActive?
         <PopUpGlobalVariable
            type={popUpGvariable.idModal}
            gVariables={popUpGvariable.gVariables}
            onComfim={(value)=> ClosePromise(popUpGvariable.idModal,value)}
            onCancel={()=> ClosePromise(popUpGvariable.idModal,null)}
            setLoading={setLoading}
         />
         :""
        }

        {
          <PopUpMessageDialog
           isActive={messageDialog.isActive}
           fullInfo={messageDialog.fullInfo}
           onCancel={()=> ClosePromise(messageDialog.fullInfo.id,null)}
            />
        }
    </div>
    )
}


function GlobalVariable({setHeaderContent,setLoading,OpenPromise}){
    const [listGlobalVariables,setListGlobalVariables] = useState([])
    const TRANSLATE_COLUMS = useMemo(()=> {return {"key":"Clave","Valor":"Valor"}},[])
    const PROPERTY_COLUMS = useMemo(()=>["key","value"],[])
    const listActions = useMemo(()=>[
        {
          "type": "EDIT-G-VARIABLE",  
          "svg":EditIcon,
          "event": async (gVariables,self) => {

            console.log(gVariables);
            
             
            const gVariableObj = await OpenPromise(self.type,{gVariables:gVariables})

            const data = await editGlobalVariable(gVariableObj)

            if(data){
                
                const  callSleep = async (ms)=>{
                    await OpenPromise("MESSAGE",{
                        fullInfo:{
                            id:"MESSAGE",
                            position:"flex-start",
                            bgd:false,
                            header: "Mensaje",
                            body: "Actualización exitosa"
                        }
                    })
                    setLoading(true)
                    await sleep(ms)
                    setLoading(false)
                } 
                callSleep(1000)    
            }
          }
        }
      ]
    ,[])

    const coverPropertyColumns = useCallback((item)=> ( 
            PROPERTY_COLUMS.map((property) => {
            const value = item[property];       
            return (
            <td key={`cell-${item.id}-${property}`}> {/* Key única por celda */}
                {value}
            </td>
            );
    }
    )
    ),[]);       

    useEffect(()=>{
        setLoading(true)
        const  callSleep = async (ms)=>{
            await getListGlobalSettings(setListGlobalVariables)
            await sleep(ms)
            setLoading(false)
        } 
        callSleep(450)  
    },[])

    useEffect(()=>{
        setHeaderContent({
            header:"Administrar Variables Globales",
            subtitle:"Variables de negocio vitales para el correcto funcionamiento del sistema"
        })
    },[setHeaderContent])

    return(
        <>
             <TableObjects
                list={listGlobalVariables}
                translateColums={TRANSLATE_COLUMS}
                coverPropertyColums={coverPropertyColumns}
                listActions={listActions}
            />
        </>
    )
}

function PopUpGlobalVariable({type,gVariables,onComfim,onCancel}){

    const currentView = G_VARIABLE[type]

    console.log(type);
      

    if(!currentView){
        return
    }

    const contentToRender = {
        header:null,
        content:null
    }
    
    contentToRender.content = <currentView.component
          onComfirm={onComfim}
          item={gVariables}
     /> 
   
     contentToRender.header = currentView.title
     return(
            <Overlay
                nameHeader={contentToRender.header}
                content={contentToRender.content}
                onCancel={onCancel}
            />
        )  
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
