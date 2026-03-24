import { ButtonAction} from "./buttons";
import { ClosePopUp } from "../svg/Svg";
import { memo } from "react";
import "../../css/components.css"


export const TableObjects = memo(function  TableObjects({translateColums,coverPropertyColums,list,subList,listActions,noValues}){

  console.log("Tabla renderizada");

  return <table className="liquidation-table">
          <thead>
            <tr>
              {/* Generamos encabezados dinámicos para las propiedades */}
              {Object.values(translateColums).map(col => <th key={`Translate-colum--${col}`}>{col}</th>)}
              {listActions.length!==0? <th>Acciones</th>:""}
            </tr>
          </thead>
         <tbody>
          {/* El error "0 is not a function" se corrige con el ? y : null */}
          {!noValues && list.length > 0 ? (
            list.map((item,index) => (
              <tr key={`row-${item.id}-${index}`}>
               
                {coverPropertyColums ? coverPropertyColums(item) : null}

                {subList ? subList(item) : null}

                {/* Acciones */}
                {listActions.length > 0 ? (

                  <td key={`${item.id}-action-user`}>
                    {listActions.map((action, index) => (
                      <ButtonAction
                        SvgComponent={action.svg}
                        action={() => action.event(item,action)}
                      />
                    )
                    )}                      
                  </td>
                 
                ) : null}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%">No hay datos disponibles</td>
            </tr>
          )}
      </tbody>
        </table>
})

export function SearchInput({value,onChange,onIconClick,refInput}){
    return(
        <div className="box-input-filter-options">
            <svg 
                viewBox="0 0 24 24"
                onClick={onIconClick}
            >
                  <path d="M21 20l-5.2-5.2a7 7 0 10-1.4 1.4L20 21zM5 11a6 6 0 1112 0A6 6 0 015 11z"/>
            </svg>

            <input
            ref={refInput} 
            type="text" 
            placeholder="Buscar ..."
            value={value}
            onChange={onChange}
            />
        </div>
    )
}

export function MenuToggle({ typeFilter,clasificationValueSelect,options = [], onSelect, open,setOpen }) {

  return (
    <div className="menu-toggle-container">

      <button
        className="menu-toggle-button"
        onClick={() => setOpen(!open)}
      >
        {
          clasificationValueSelect()
        }
        <svg viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      {open && (
        <ul className="menu-toggle-dropdown">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {

                if(opt.value === ""){
                  onSelect({
                    "filter":"",
                    "value":""
                })
                }else{
                    onSelect({
                    "filter":typeFilter,
                    "value":opt.value
                });
                }
                
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function WrapperUniqueFilter({ComponentA,ComponentB}){
  return(
      <div className="wrapper-unique-filter">
           {ComponentA}
           {ComponentB}
      </div>
     
  )
}

export function Overlay({bgd,position,nameHeader,content,onCancel}){

   const customOverlay = {
    // Los valores deben ser strings y la propiedad usar camelCase
    backgroundColor: bgd ? "rgba(0,0,0,0.5)" : "transparent",
    alignItems: position 
  };

  return(
    <div className="overlay animate-to-mount" style={customOverlay}>
            <div className="content-overlay">
                <div className="header-overlay">
                    <h3>{nameHeader}</h3>
                </div>
                {
                  content
                }
                 <div className="box-close-overlay">
                        <ButtonAction
                            SvgComponent={ClosePopUp}
                            action={()=> onCancel()}
                        />
                </div>   
            </div>
        </div>
  )
}

export function EditValues({valueInput,onChangeInput,keyParam,nameAction,doEdit}){

  console.log(keyParam);

  return(
       <div className="edit-values">
      {/* Primer div: Contiene Label e Input */}
      <div className="field-group">
        <label htmlFor="name-input">{keyParam}</label>
        <input 
          type="text" 
          id="name-input" 
          placeholder="Escribe el nuevo valor..." 
          className="custom-input"
          value={valueInput}
          onChange={onChangeInput}
        />
      </div>

      {/* Div hermano: Contiene el botón */}
      <div className="action-group">
          <ButtonAction
              className="submit-btn"
              children={nameAction}
              action={doEdit}
            />
      </div>
    </div>
  )
}