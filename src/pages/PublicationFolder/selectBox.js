const select = document.querySelector('#select');
const opciones = document.querySelector('#opciones');
const contenidoSelect = document.querySelector('#select .contenido-select');
const hiddenInput = document.querySelector('inputSelect');
const inputBuscar = document.querySelector('#inputBuscar');
select.addEventListener('click',()=>{
    select.classList.toggle('active');
    opciones.classList.toggle('active');
})

document.querySelectorAll('#opciones > .opcion').forEach((opcion)=>{
    opcion.addEventListener('click',(e)=>{
       e.preventDefault() 
       contenidoSelect.innerHTML = e.currentTarget.innerHTML;
       select.classList.toggle('active');
       opciones.classList.toggle('active');
    })
})

inputBuscar.addEventListener('keyup',(e)=>{
   opciones.classList.add('active');
   let value; 
   if(inputBuscar.value != ""){
    value = inputBuscar.value;
    a = opciones.children;
    for(let i=0;i<a.length;i++){
       textValue = a[i].getElementsByTagName('h2')[0].innerText;
       if(textValue.toUpperCase().includes(value.toUpperCase())){
         a[i].style.display = "";
       }else{
         a[i].style.display = "none"
       }
     }
   }else{
    opciones.classList.remove('active');
    select.classList.remove('active');
    for(let i=0;i<a.length;i++){
      a[i].style.display = 'block'
    }
   } 
})

contenidoSelect.addEventListener('DOMNodeInserted',(e)=>{
  e.preventDefault()
  select.classList.add("active")
})