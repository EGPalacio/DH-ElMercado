window.addEventListener("load", function () {
  let formulario = document.querySelector("form.newProduct");
  
  

  let name = document.querySelector("#name");
  let description = document.querySelector("#description");
  let price = document.querySelector("#price");
  console.log(name);
  

  let file = document.getElementById("imgPortada");

  let errores = [];

  formulario.addEventListener("submit", function (e) {
    formulario.classList.add("was-validated");

    if (name.value.length < 5) {
      errores.push("El nombre del producto debe tener al menos 5 caracteres");
    }
    if (description.value.length < 20) {
      errores.push("La descripción debe tener al menos 20 caracteres");
    }

    if (price.value.length < 2) {
      errores.push("El precio no puede estar vacio");
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

    if (errores.length != 0) {
      e.preventDefault();

      let mensajes = "";

      errores.forEach((error) => {
        mensajes += "-> " + error + " <br>";
      });

      Swal.fire({
        icon: "error",
        title: "Oops...Algo salio mal!",
        html: mensajes,
      });
    }
  });
});
