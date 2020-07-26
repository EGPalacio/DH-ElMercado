window.addEventListener("load", function(){
    let first_name = document.querySelector("#first_name")
    let last_name = document.querySelector("#last_name")
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    let file = document.getElementById("avatar");

    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let form = document.querySelector("#form")

    form.addEventListener("submit", function(e){
        let errores = [];

        if(first_name.value.length < 2){
            errores.push("Tu nombre debe tener al menos 2 caracteres")
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
        var avatar = file.value,
        idxDot = avatar.lastIndexOf(".") + 1,
        extFile = avatar.substr(idxDot, avatar.length).toLowerCase();
        if (
        extFile == "jpg" ||
        extFile == "jpeg" ||
        extFile == "png" ||
        extFile == ""
        ) {
        } else {
        errores.push("Solo archivos jpg/jpeg y png estan permitidos!");
        file.value = ""; // Reset  input
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