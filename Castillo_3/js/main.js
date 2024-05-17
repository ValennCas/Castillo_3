"use scrict";
let botonEnviar=document.getElementById("boton_enviar");
let botonBorrarTodo=document.getElementById("boton_borrar");

//Se le asigna al boton el evento del click donde, primero asigna un evento y luego controla los datos que se envian
botonEnviar.addEventListener("click", function(e){
    e.preventDefault();
    asignarEvento();
    controlEnvio();
});

//BotonBorrar se le asigna el evento click donde, se limpiaran los campos de textos (los p que se muestran si se envia 
//el formulario y hay un campo requerido sin completar)
//Limpiar inputs se encarga de borrar el estilo rojo en caso de tenerlo
//y borrar campos elimina el valor de los inputs 
botonBorrarTodo.addEventListener("click", function(e){
    e.preventDefault();
    limpiarCamposTexto();
    limpiarInputs();
    borrarCampos();
});

//Se encarga de que todos los inputs y el textarea esten pendiente a si se cambia su valor(no este vacio), se elimine la clase que le da 
//borde rojo y el parrafo que indicaba que el campo estaba vacio se vuelva "".
function asignarEvento(){
    let input=document.querySelectorAll("input");
    for(let i=0;i<input.length;i++){
       input[i].addEventListener("change", function(){
        if(NoEstaVacio(input[i])){
            input[i].classList.remove("estiloInput");
            let p=input[i].previousElementSibling; //Se toma al anterior hermano(p).
            p.innerHTML="";
        }
       })
    }
    let textArea=document.getElementById("mensaje");
    textArea.addEventListener("change", function(){
        if(NoEstaVacio(textArea)){
            textArea.classList.remove("estiloInput");
            let p=textArea.previousElementSibling;
            p.innerHTML="";
        }
    })

}

//Limpia el valor de los campos
function borrarCampos(){
    document.getElementById("telefono").value="";
    document.getElementById("email").value="";
    document.getElementById("asunto").value="";
    document.getElementById("mensaje").value="";
}

//Se encarga de controlar que los campos que se requieren si o si llenos, tengan un valor y de ahi se redirige a la 
//pagina afirmacion
//En caso contrario, en los inputs que se encuentren vacios se le avisará que tiene que llenar el campo y se le agregará
//la clase que le de estilo al input con un borde rojo.  
function controlEnvio(){
    let telefono=document.getElementById("telefono").value;
    let email=document.getElementById("email").value;
    let asunto=document.getElementById("asunto").value;
    let mensaje=document.getElementById("mensaje").value;

    if((NoEstaVacio(telefono) || NoEstaVacio(email))
      && NoEstaVacio(mensaje)){
        location.href="afirmacion.html";
    }
    else{
        //tanto el if de telefono como email se comprueba que el otro campo (en caso telefono se comprueba tambien email)
        //no este vacio, si se encuentra vacio, se le agregará el texto y la clase, en caso de que no se encuentre vacio
        //pues se le quitará la clase y el mail ya que es necesario que uno de los dos campos este lleno, no los dos.
        if(!NoEstaVacio(telefono)){
            if(!NoEstaVacio(email)){
                document.getElementById("campoVacíoTelefono").innerHTML="Se necesita completar el campo";
                document.getElementById("telefono").classList.add("estiloInput");
            }
            else{
                document.getElementById("campoVacíoTelefono").innerHTML="";
                document.getElementById("telefono").classList.remove("estiloInput");
            }
        }
        if(!NoEstaVacio(email)){
            if(!NoEstaVacio(telefono)){
                document.getElementById("campoVacíoEmail").innerHTML="Se necesita completar el campo";
                document.getElementById("email").classList.add("estiloInput");
            }
            else{
                document.getElementById("campoVacíoEmail").innerHTML="";
                document.getElementById("email").classList.remove("estiloInput");
            }
        }
        if(!NoEstaVacio(mensaje)){
            document.getElementById("campoVacíoMensaje").innerHTML="Se necesita completar el campo";
            document.getElementById("mensaje").classList.add("estiloInput");
        }
    }
}

//Toma todos los p que se encuentren en el formulario y los vuelve a "".
function limpiarCamposTexto(){
    let p=document.querySelectorAll("form p");
    for(let i=0;i<p.length;i++){
       p[i].innerHTML="";
    }
}

//Les quita la clase estiloInput(da el borde rojo).
function limpiarInputs(){
    let input=document.querySelectorAll("input");
    for(let i=0;i<input.length;i++){
       input[i].classList.remove("estiloInput");
    }
    let textArea=document.getElementById("mensaje");
        textArea.classList.remove("estiloInput");
}

//Se encarga de verificar que el dato que viene por parametro no este vacio, retornará true o false dependiendo 
//de su valor.
function NoEstaVacio(mensaje){
    if(mensaje!=""){
        return true;
    }
    return false
}