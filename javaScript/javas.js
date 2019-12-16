var urlCheckIn="https://app-datos-registros.herokuapp.com/checkIn"
var urlLogIn="https://app-datos-registros.herokuapp.com/logIn"
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
    resetImput();
    alert(contenido);
}

async function logIn(){
    var nombre=document.getElementById("nombreL").value
    var clave=document.getElementById("claveL").value
    var respuesta=await fetch(urlLogIn,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({nombre:nombre, clave:clave})
    });
    var contenido=await respuesta.json()
    if(contenido.token==0){
        alert('usuario o contraseña incorrectos')
        resetImput()
        break
    }else{
        document.cookie = `token=${contenido.token}`
        location.href=contenido.res;
    }
}
function resetImput(){
    document.getElementById("nombreR").value=""
    document.getElementById("claveR").value=""
    document.getElementById("nombreL").value=""
    document.getElementById("claveL").value=""
}
resetImput()