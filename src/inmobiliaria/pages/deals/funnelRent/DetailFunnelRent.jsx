import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState,useCallback } from 'react';
import { CreateCardDealLiquidate } from '../Deals';
import { SpinnerLoadingData } from '../../../components/pureComponents/Spinners';
import { createPaymentPlan, getPlansFunnelRent } from './services/funnelRentService';
import { CardDetail } from '../../../components/pureComponents/component';
import { ButterflyNet } from '../../../components/svg/Svg';
import "../../../css/plan.css"

const NormalContentCard = ({index,item})=>{
  const fields = [
    { label: "Pago #", value: index+1 },
    { label: "Nombre", value: item?.simpleUserDto?.name },
    { label: "Fecha de pago", value: item?.traceSecondDate },
    // Solo agrega una línea aquí para nuevos campos:
    // { label: "Monto", value: item?.amount }, 
  ];

  return (
    <>
        {fields.map((field, index) => (
        <div key={index} className="card-detail-item">
          <span className="card-detail-label">{field.label}</span>
          <span className="card-detail-value">{field.value || "---"}</span>
        </div>
      ))}
    </>
 
  );
}

const LIST_ACTIONS = [
    {
      "svg":ButterflyNet,
      "event": (planPay,self) => createPaymentPlan(planPay.uuid)
    }
]

function CallCardCreationDealLiquidate({dealLiquidate}){
     const block1 = {
                    title: dealLiquidate.pipelineType,
                    subtitle: dealLiquidate.nameUser
                };
                
    const block2 = [
        dealLiquidate.amount,
        dealLiquidate.closedAt
    ];
    return (
      <div className='recreate-liquidation'>
           <CreateCardDealLiquidate
            key={dealLiquidate.nameUser}
            item={dealLiquidate}
            block1={block1} 
            block2={{ items: block2 }} 
            actionList={[]} 
        />
      </div>
        )
    
}


function RecreatePlan({listPlans}){
  console.log(listPlans);
  
  return(
    <div className='recreate-plan'>
        {
            listPlans.map((item,index)=>{
            console.log(item);

            return <CardDetail
            key={index}
            item={item}
            normalContentCard={<NormalContentCard index={index} item={item} />}
            listActions={LIST_ACTIONS}
            />
            })
        }
    </div>
    
  )
}

export function DetailFunnelRent(){
  const location = useLocation();
  const {id} = useParams()
  const [dealLiquidate, setDealLiquidate] = useState(location.state?.item || null);
  const [listPlans, setListPlans] = useState([])
  const [loading,setLoading] = useState(dealLiquidate)

   
  useEffect(() => {
  
     const execute = async ()=>{
          const savedId = id || sessionStorage.getItem('currentDealId');
          const responsePlan = await getPlansFunnelRent(savedId)
          console.log(responsePlan);
          if(!dealLiquidate){
            setDealLiquidate(responsePlan.dealLiquidateResponseDto.dealRegisterDto)
          }
          setListPlans(responsePlan.paymentPlanSimpleDto)
      }

      execute()
  },[]);

  return(
    <div className='container-primary-funnelRent-detail'>
      {
        !loading
        ?(
            <SpinnerLoadingData/>
        ):
        (
            <div>
                <div>
              <CallCardCreationDealLiquidate
                dealLiquidate={dealLiquidate}
              />
            </div>
            <div>
              {
                listPlans.length>0
                  ?<RecreatePlan
                    listPlans={listPlans}
                    />
                :null
              }
            </div>
          </div>
        )
      }
        
    </div>
  )
};