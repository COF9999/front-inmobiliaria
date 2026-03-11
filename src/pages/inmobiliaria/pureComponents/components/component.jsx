
import "../../css/components.css"


export function TableObjects({list,propertyColumns}){

  return <table className="liquidation-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner ID</th>
              <th>Pipeline</th>
              {/* Generamos encabezados dinámicos para las propiedades */}
              {propertyColumns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.ownerId}</td>
                  <td>{item.pipelineType}</td>
                  {/* Accedemos al Map de properties */}
                  {propertyColumns.map(col => (
                    <td key={col}>{item.properties[col] || "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3 + propertyColumns.length} style={{textAlign: 'center'}}>
                  No hay datos disponibles
                </td>
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

export function MenuToggle({ typeFilter,valueResultComponentFilter,setValueResultComponentFilter,options = [], onSelect, open,setOpen }) {

  return (
    <div className="menu-toggle-container">

      <button
        className="menu-toggle-button"
        onClick={() => setOpen(!open)}
      >
        {valueResultComponentFilter?.trim()
        ?`${valueResultComponentFilter} dias`
        :"Opciones"
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
                onSelect({
                    "filter":typeFilter,
                    "value":opt.value
                });
                setOpen(false);
                setValueResultComponentFilter(opt.value)
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