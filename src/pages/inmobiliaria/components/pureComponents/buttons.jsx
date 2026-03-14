import { Button } from "@mui/material"

export function ButtonAction({SvgComponent,action}){
    return (
        <Button
            onClick={action}
        >
               <SvgComponent></SvgComponent>
        </Button>
        
    )
}