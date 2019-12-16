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
    //var contenido=await respuesta.json()
    //console.log(contenido.length)
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
}
async function logOut(){
    var respuesta=await fetch(urlLogOut,{
        method:'POST',
        headers:{
            token:token
        }
    });
    var contenido=await respuesta.json();
    console.log(contenido.res)
}
getData();