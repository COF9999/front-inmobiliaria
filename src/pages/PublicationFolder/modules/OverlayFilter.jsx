import { BannerFilter } from "./FilterComponentOverlay"
import "../css/overlayFilter.css"


export function OverlayFilter({activeOverlayFilter,setAllPublications,setActiveOverlayFilter}){

    if(activeOverlayFilter===false){
        return
    }

    return(
        <div className="overlay-full-width">
            <div className="div-part-1">
                <BannerFilter
                    setActiveOverlayFilter={setActiveOverlayFilter}
                    setAllPublications={setAllPublications}
                ></BannerFilter>
            </div>
        </div>
    )
}