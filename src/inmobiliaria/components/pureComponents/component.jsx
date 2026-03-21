import { ButtonAction} from "./buttons";
import { ClosePopUp } from "../svg/Svg";
import "../../css/components.css"


export function TableObjects({propertyColumns,subListPropertyColums,coverPropertyColums,list,subList,listActions,noValues}){

  return <table className="liquidation-table">
          <thead>
            <tr>
              {/* Generamos encabezados dinámicos para las propiedades */}
              {propertyColumns.map(col => <th key={`Property-colum--${col}`}>{col}</th>)}
              {subListPropertyColums!=null ? subListPropertyColums.map(col => <th key={`sublist-Property-colum--${col}`}>{col}</th>): ""}
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
                  listActions.map((action, index) => (
                    <td key={`${item.id}-action-${index}`}>
                      <ButtonAction
                        SvgComponent={action.svg}
                        action={() => action.event(item,action)}
                      />
                    </td>
                  ))
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
}

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

export function Overlay({nameHeader,content,onCancel}){
  return(
    <div className="overlay">
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
                            action={()=> onCancel("")}
                        />
                </div>   
            </div>
        </div>
  )
}