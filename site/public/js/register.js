

window.addEventListener("load", function () {
  let formulario = document.querySelector("form.register");

  let first_name = document.querySelector("#first_name");
  let last_name = document.querySelector("#last_name");
  let email = document.querySelector("#email");
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let password = document.querySelector("#password");
  
  let password_repeat = document.querySelector("#password_repeat");

  let file = document.getElementById("avatar");

  let errorSec = document.querySelector("#errors");
  let errores = [];

  formulario.addEventListener("submit", function (e) {
    formulario.classList.add("was-validated");

    

    

    if (first_name.value.length < 2) {
      errores.push("Tu nombre debe tener al menos 2 caracteres");
    }
    if (last_name.value.length < 2) {
      errores.push("Tu apellido debe tener al menos 2 caracteres");
    }

    if (!email.value.match(mailFormat)) {
      errores.push("Tenes que ingresar un mail valido");
    }

    if (
      !password.value.match(/[a-z]/g) &&
      !password.value.match(/[A-Z]/g) &&
      !password.value.match(/[0-9]/g) &&
      !password.value.match(/[^a-zA-Z\d]/g) &&
      password.value.length < 8
    ) {
      errores.push("La contraseña debe contar con una letra Mayuscula, una minuscula, un numero y al menos 8 caracteres");
    }

    if (password_repeat.value.trim() != password.value.trim()) {
      errores.push("Las contraseñas no coinciden");
    }

    var avatar = file.value,
  idxDot = avatar.lastIndexOf(".") + 1,
  extFile = avatar.substr(idxDot, avatar.length).toLowerCase();
  if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile==""){
   
  }else{
    errores.push("Solo archivos jpg/jpeg y png estan permitidos!");
    file.value = "";  // Reset  input 
  }

   


     if (errores.length != 0) {
      e.preventDefault();
     
      
      let mensajes = '';

      

      errores.forEach  (error => {
      mensajes += '-> '+ error + ' <br>';
      })
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...Algo salio mal!',
          html:  mensajes,
         
        })


        
    
     
      
      
    } 
  });


 
});

 