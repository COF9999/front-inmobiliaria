import { ButtonAction} from "./buttons";
import { ClosePopUp } from "../svg/Svg";
import { memo } from "react";
import React from 'react';
import { MoreHorizontal} from 'lucide-react';
import "../../css/components.css"



export const CardDetail=({item,normalContentCard,listActions})=>{
  const isSuccess = item.isRealizedPay
  return(  
       <div class="card-detail"  style={{ borderBottom: `4px solid ${isSuccess ? '#22c55e' : '#ef4444'}` }}>
          <div class="card-detail-grid">
                     {normalContentCard ? normalContentCard : null}
                     {listActions.length > 0 ? (
                    <div key={`${item.id}-action-user`}>
                      {listActions.map((action, index) => (
                          <div class="card-detail-actions">
                            <ButtonAction
                                className="btn-action"
                                SvgComponent={action.svg}
                                action={() => action.event(item,action)}
                            />
                          </div>
                      )
                      )}                      
                    </div>

                    ) : null}
                </div>
        </div>
      )
}  
    

export const ProfessionalCard = ({ item,dataBlock1, dataBlock2, actions }) => {
  return (
    <div className="w-[80%] h-[200px] bg-white rounded-2xl shadow-md border border-slate-200 flex overflow-hidden">
        {/* COLUMNA 1: Estructura vertical (H2 y H3) */}
        <div className="w-1/3 flex flex-col border-r border-slate-100">
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50/50">
            <h2 className="text-2xl font-extrabold text-slate-800 text-center uppercase tracking-tight">
              {dataBlock1.title}
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 border-t border-slate-100">
            <h3 className="text-lg font-medium text-slate-500 text-center leading-relaxed">
              {dataBlock1.subtitle}
            </h3>
          </div>
        </div>

        {/* COLUMNA 2: Grid de elementos (5 u 8) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 h-full content-center">
            {dataBlock2.items.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-default font-medium text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA 3: Panel de Acciones (Estrategia de bloque) */}
        <div className="w-[80px] bg-slate-900 flex flex-col justify-center items-center py-6 gap-6">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={()=> action.event(item,action)}
              className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 group"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
          <div className="mt-auto">
            <button className="text-slate-500 hover:text-white">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>

      </div>
  );
};

export const TableObjects = memo(function  TableObjects({translateColums,coverPropertyColums,list,subList,listActions,noValues}){

  console.log("Tabla renderizada");

  return <table className="table-result">
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