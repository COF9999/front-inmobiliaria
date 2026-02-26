import { useEffect, useState,useRef } from "react"
import axios from "axios"
import "../css/denunciation.css"
import { localStorageFunction } from "../js/methodsLocalStorage"
import {baseUrl} from "../../../hostConfig";
import supportSvg from"../../images/support.svg"

function Denunciations({userDenunciator,message}){
    return(
        <div className="card-denunciations">
            <h3>{userDenunciator}</h3>
            <h4>Denuncia</h4>
            <p>
                {message}
            </p>
        </div>
    )
}

function ImgNameProfile({namePerson}){
    return(
        <div className="div-image-my-profile">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/6378/6378141.png" alt="" />
                    </div>
                    <div>
                        <h2>{namePerson!=null?namePerson:""}</h2>
                    </div>
        </div>
    )
}

export function Profile(){

    const [dataProfile,setDataProfile] = useState(null)
    const [denunciations,setDenunciations] = useState([])
    const poinstMap = useRef({
        1:["10 cupones de bienestar"],
        2:["30 cupones de bienestar"],
        3:["90 cupones de bienestar"]
    })
    const urlLamdbaSupport = useRef(import.meta.env.VITE_LAMBDA_SUPPORT)

    useEffect(()=>{
        const fetchContentInfoProfile = async () =>{
                
                const body ={
                    "token": localStorageFunction()
                }

                try{
                    const response = await axios.post(`${baseUrl}/user/my-points`,body)
                    if(response.status === 200){
                        setDataProfile(response.data)
                        console.log(response.data);
                    }else{
                        console.log("BAD RETURN OFF SERVER");
                    }
                }catch(e){
                    console.log("Internal Server Error");
                }


        }

        const fetchContentDenunciations = async () =>{
            
            const body ={
                "tokenDto":{
                    "token": localStorageFunction()
                }
            }

            try{
                const response = await axios.post(`${baseUrl}/denuciations/find-denunciats`,body)
                if(response.status === 200){
                    setDenunciations(response.data)
                    console.log(response.data);
                }else{
                    console.log("BAD RETURN OFF SERVER");
                }
            }catch(e){
                console.log(e);
                console.log("Internal Server Error");
            }
        }


        fetchContentInfoProfile()
        fetchContentDenunciations()

    },[])

    const calcPoinst = (points) =>{
        if(points>200 && points < 500){
            return poinstMap.current["1"]
        }else if(points>500 && points < 1000){
            return poinstMap.current["2"]
        }else{
            return poinstMap.current["3"]
        }
    }

    const redirectToLamddaSupport = ()=>{

    }

    const enviroment = window.env?.VITE_ENVIRONMENT || import.meta.env.VITE_ENVIRONMENT

    return(
        <div className="container-principal-my-profile">

                <ImgNameProfile
                    namePerson={dataProfile!= null?dataProfile.users.name:""}
                ></ImgNameProfile>
                <div className="div-points">
                    <h1>Puntos</h1>
                    {
                        dataProfile != null
                        ?<div>
                            <h2>{dataProfile.acumPoints}</h2>
                            <h3>{calcPoinst(dataProfile.acumPoints)}</h3>
                        </div>
                        :""
                    }
                </div>
                <div className="div-denunciations">
                <h2>Denuncias</h2>
                {
                  denunciations.map((item,index)=>{
                   return  <Denunciations
                   key={index}
                   userDenunciator={item.userDenunciator.name}
                   message={item.message}
                   >
                   </Denunciations>
                  })
                }
                </div>
                <div className="div-support-publication">
                    <a href={enviroment=="LOCAL"?urlLamdbaSupport.current:"/lambda-support"} target="_blank">
                        <img src={supportSvg} alt="" onClick={redirectToLamddaSupport} />
                    </a>
                   
            </div>
               
        </div>
    )
}
