import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function DetailFunnelSales(){
  const location = useLocation();
  const [dealId, setDealId] = useState(null);

  useEffect(() => {
    // Prioridad 1: El estado de la navegación
    // Prioridad 2: El respaldo en sessionStorage
    const id = location.state?.dealId || sessionStorage.getItem('currentDealId');
    
    if (id) {
      setDealId(id);
      // Aquí harías tu petición al API usando el ID
      console.log("Cargando datos para el ID:", id);
    }
  }, [location]);

  if (!dealId) return <p>No se encontró la información del deal.</p>;

  return (
    <div>
      <h2>Detalle de Renta</h2>
      <p>ID del Item: {dealId}</p>
    </div>
  );
};