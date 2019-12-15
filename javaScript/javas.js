var urlCheckIn="app-datos-registros.herokuapp.com/checkIn"
var urlLogIn="https://app-datos-registros.herokuapp.com/logIn"
var urlDatos="https://app-datos-registros.herokuapp.com/informacion"
var urlUpdate="https://app-datos-registros.herokuapp.com/upDate"
var urlLogOut="https://app-datos-registros.herokuapp.com/logOut"
var token=0;
async function registrar(){
    var nombre=document.getElementById("nombreR").value;
    var clave=document.getElementById("claveR").value;
    var user={
        nombre:nombre,
        clave:clave
    }
    var respuesta= await fetch(urlCheckIn,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({nombre:nombre,clave:clave})
    });
    var contenido= await respuesta.text();
    alert(contenido);
}

async function logIn(){
    var nombre=document.getElementById("nombreL").value
    var clave=document.getElementById("claveL").value
    console.log(`el nombre es ${nombre} y la clave ${clave}`)
    var respuesta=await fetch(urlLogIn,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({nombre:nombre, clave:clave})
    });
    var contenido=await respuesta.json()
    token=contenido.token
    console.log(token)
    if(token===0){
        alert('usuario o contraseña incorrectos')
    }else{
        //pedir los datos al servidor y cargarlos.
        getData(token)
    }
}

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