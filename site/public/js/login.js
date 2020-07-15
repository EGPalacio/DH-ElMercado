window.addEventListener("load", function(){
    let form = document.querySelector("#form");
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    form.addEventListener("submit", (e) => {
        let errores = [];

        let email = document.querySelector("#email")
        if (email.value == "") {
            errores.push("El campo email debe estar completo")
        }else if (!email.value.match(mailFormat)) {
            errores.push("El mail debe ser un formato Válido")
        }

        let password = document.querySelector("#password")
        if (password.value == "") {
            errores.push("El campo password debe estar completo")
        }else if (
            /* password.value.match(/[a-z]/g) &&
            password.value.match(/[A-Z]/g) &&
            password.value.match(/[0-9]/g) &&
            password.value.match(/[^a-zA-Z\d]/g) && */
           password.value.length < 8
          ) {
            errores.push("La contraseña debe contar con una letra Mayuscula, una minuscula, un numero y al menos 8 caracteres");
          }

        if (errores.length > 0) {
            e.preventDefault()

            let mensaje = "";
            for (let error of errores) {
                mensaje += `${error}` + " <br>";
                console.log(error)
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...Algo salio mal!',
                html:  mensaje,
              })
        }
})
})