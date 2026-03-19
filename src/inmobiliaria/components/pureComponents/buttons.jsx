import { Button } from "@mui/material"

export function ButtonAction({SvgComponent,action,children}){
    return (
        <Button
            onClick={action}
        >
               {SvgComponent!=null && <SvgComponent></SvgComponent>}
               {children!=null && children} 
        </Button>
        
    )
}