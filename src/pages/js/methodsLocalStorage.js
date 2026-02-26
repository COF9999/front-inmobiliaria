export function localStorageFunction(){
    return localStorage.getItem('token')!=null?localStorage.getItem('token'):""
}