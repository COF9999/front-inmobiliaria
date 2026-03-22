export const CreateUserJsx = ()=>{
    return(
         <form className="user-form"> 
            <div className="form-grid">
            
            <div className="form-section">
                <h3>Datos Personales</h3>
                <div className="field">
                <label htmlFor="name">Nombre Completo</label> {/* htmlFor en lugar de for */}
                <input type="text" id="name" placeholder="Ej. Juan Pérez" />
                </div>
                <div className="field">
                <label htmlFor="identification">Cedula</label>
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
                <label htmlFor="username">Nombre de usuario</label>
                <input type="text" id="username" placeholder="usuario123" />
                </div>
                <div className="field">
                <label htmlFor="email">Correo</label>
                <input type="email" id="email" placeholder="correo@ejemplo.com" />
                </div>
                <div className="field">
                <label htmlFor="password">Contraseña</label>
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
}