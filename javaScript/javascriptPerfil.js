var urlDatos="https://app-datos-registros.herokuapp.com/informacion"
var urlUpdate="https://app-datos-registros.herokuapp.com/upDate"
var urlLogOut="https://app-datos-registros.herokuapp.com/logOut"
var token=document.cookie.split('=')[1];
console.log(token)
async function getData(token){
    console.log(token)
    var respuesta=await fetch (urlDatos,{
        method: 'GET',
        headers:{
            token:token
        }
    });
    var contenido=await respuesta.json()
    var titulo=document.querySelector('h1')
    titulo.innerText=`${contenido[0].nombre}`
    var lista=document.getElementById('lista')
    for(var i=0;i<contenido.length;i++){
        lista.insertAdjacentHTML("beforeend",`
            <div>
                <span><h2>${contenido[i].empresa}</h2></span>
                <span><p><b>Puesto:</b> ${contenido[i].puesto}</p></span>
                <span><p><b>contacto:</b> ${contenido[i].contacto}</p></span>
                <span><p><b>Fecha:</b> ${contenido[i].fecha}</p></span><br>
                <span><p><b>Descripcion:</b> ${contenido[i].descripcion}</p></span>
            </div>
        `);
    }
    //cargar los datos y hacer magia
}
async function upDate(){
    var f = new Date();
    var fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
    var contacto=document.getElementById("contacto").value
    var empresa=document.getElementById("empresa").value
    var puesto=document.getElementById("puesto").value
    var descripcion=document.getElementById("descripcion").value
    var respuesta= await fetch(urlUpdate,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            token:token
        },
        body:JSON.stringify({empresa:empresa, contacto:contacto, puesto:puesto, descripcion:descripcion,fecha:fecha})
    });
    var contenido=await respuesta.json()
    location.reload()
}
async function logOut(){
    var respuesta=await fetch(urlLogOut,{
        method:'POST',
        headers:{
            token:token
        }
    });
    var contenido=await respuesta.json();
    document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.href="https://app-registros.netlify.com/";
}
getData(token);