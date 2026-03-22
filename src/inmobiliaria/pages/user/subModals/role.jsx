import { useState } from "react";
import { MenuToggle } from "../../../components/pureComponents/component";
import { ButtonAction } from "../../../components/pureComponents/buttons";

export function ChangeRol({typeFilter,actualRolesOptions,expectedRolesOptions,onComfirm}
){
    const [rolActual, setRolActual] = useState("");
    const [rolNuevo, setRolNuevo] = useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleConfirm = () => {
        onComfirm({ actualRol: rolActual, newRol: rolNuevo });
    };

    return (
        <>
            <div className="wrapper-popup-role">
                <div className="row-wrapper">
                    <MenuToggle
                        typeFilter={typeFilter}
                        clasificationValueSelect={() => rolActual || "ROL ACTUAL"}
                        options={actualRolesOptions}
                        onSelect={(info) => setRolActual(info.value)}
                        open={open1}
                        setOpen={setOpen1}
                    />
                    <MenuToggle
                        typeFilter={typeFilter}
                        clasificationValueSelect={() => rolNuevo || "ROL NUEVO"}
                        options={expectedRolesOptions}
                        onSelect={(info) => setRolNuevo(info.value)}
                        open={open2}
                        setOpen={setOpen2}
                    />
                </div>
            </div>
            <div className="container-action-single-role">
                <ButtonAction action={handleConfirm}> Enviar </ButtonAction>
            </div>
        </>
    );
}