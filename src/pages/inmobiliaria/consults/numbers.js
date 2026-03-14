export const formatCurrencyLocal = (amount)=> Number(amount).toLocaleString('es-CO', {
  minimumFractionDigits: 0, 
  maximumFractionDigits: 0 
});