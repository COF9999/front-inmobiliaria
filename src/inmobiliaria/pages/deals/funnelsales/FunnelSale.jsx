import { useNavigate } from 'react-router-dom';


 const navigateToDetail = (item) => {
    // 1. Guardamos en sessionStorage como respaldo
    sessionStorage.setItem('currentDealId', item.id);
    
    // 2. Navegamos pasando el estado (limpio, no se ve en la URL)
    navigate('detail', { state: { dealId: item.id } });
    };

export function FunnelSale(){
    const navigate = useNavigate();

   
}