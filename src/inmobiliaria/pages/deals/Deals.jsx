import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findDealsLiquidateByStatus } from './services/dealsService';
import { ProfessionalCard } from '../../components/pureComponents/component';
import { Settings, Trash2, Edit, Share2, Eye } from 'lucide-react';
import "../../css/deals.css"


export function DealsHome(){

    const navigate = useNavigate();
    const [deals,setDeals] = useState([])

    const navigateToDetail = useCallback((item) => {
        // 1. Guardamos en sessionStorage como respaldo
        sessionStorage.setItem('currentDealId', item.id);
        console.log("ENTRO");
        
        if(item.dealRegisterDto.pipelineType=="Funnel Sale"){
            navigate(`funnel-sale/detail/${item.dealRegisterDto.dealUserId}`,{ state: { item: item.dealRegisterDto } })
        }else{
            navigate(`funnel-rent/detail/${item.dealRegisterDto.dealUserId}`,{ state: { item: item.dealRegisterDto } })
        }
    },[])

    const actionList = useMemo(()=>[
        {   icon: <Eye size={20} />, 
            label: "Ver", 
            event: (deal,self) => navigateToDetail(deal) 
        },
    ],[]);

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
                  ? <ManipulatateCreationCard list={deals} actionList={actionList}/>
                  :""
               } 
            </div>
        </div>
    )
}


function ManipulatateCreationCard({list,actionList}){
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
                    <CreateCardDealLiquidate
                        key={index}
                        item={dealLiquidate}
                        block1={block1} 
                        block2={ { items: block2 }} 
                        actionList={actionList} 
                    />
                );
            })}
        </>
    );
}

export function CreateCardDealLiquidate({key,item,block1,block2,actionList}){
    return(
        <ProfessionalCard
                        key={key}
                        item={item}
                        dataBlock1={block1} 
                        dataBlock2={block2} 
                        actions={actionList} 
        />
    )
}

{/*  */}