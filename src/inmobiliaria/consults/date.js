export const convertStringDate = (strDate)=>{
    return new Date(strDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
}


export const generateId = () => {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
};