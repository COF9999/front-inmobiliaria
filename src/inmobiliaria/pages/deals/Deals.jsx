import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findDealsLiquidateByStatus } from './services/dealsService';
import { ProfessionalCard } from '../../components/pureComponents/component';
import { Settings, Trash2, Edit, Share2, Eye } from 'lucide-react';
import "../../css/deals.css"


const actionList = [
        { icon: <Eye size={20} />, label: "Ver", onClick: () => console.log("View") },
];

export function DealsHome(){

    const navigate = useNavigate();
    const [deals,setDeals] = useState([])

    const navigateToDetail = (typeFunnel,item) => {
        // 1. Guardamos en sessionStorage como respaldo
        sessionStorage.setItem('currentDealId', item.id);
        if(typeFunnel){
            navigate('funnel-sale/detail',{ state: { dealId: item.id } })
        }else{
            navigate('funnel-rent/detail',{ state: { dealId: item.id } })
        }
    }

    useEffect(()=>{
        const applyConsult = async()=>{
            const responseDeals = await findDealsLiquidateByStatus("OPEN")
            setDeals(responseDeals)
            console.log(responseDeals);
        }
       
        applyConsult()
        
    },[])

    return (
        <div className='container-primary-deals view-animation'>

            <div className='deals-main-container'>
              {
                  deals.length>0
                  ? <RecreateCard list={deals}/>
                  :""
               } 
            </div>
        </div>
    )
}


function RecreateCard({list}){
   return (
        <>
            {list.map((dealLiquidate, index) => {
                const block1 = {
                    title: dealLiquidate.dealRegisterDto.pipelineType,
                    subtitle: dealLiquidate.dealRegisterDto.nameUser
                };
                
                const block2 = [
                    dealLiquidate.dealRegisterDto.amount,
                    dealLiquidate.dealRegisterDto.closedAt
                ];

                return (
                    <ProfessionalCard 
                        key={index} 
                        dataBlock1={block1} 
                        dataBlock2={ { items: block2 }} 
                        actions={actionList} 
                    />
                );
            })}
        </>
    );
     
}

{/*  */}