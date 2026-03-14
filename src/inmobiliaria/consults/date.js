export const convertStringDate = (strDate)=>{
    return new Date(strDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
}
