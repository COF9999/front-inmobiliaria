export function buildNormalHeader(token){
    return {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
    }
}
