window.addEventListener('load', () => {

    // Arrary errors
    let errors = [];
    let nameLenght = 'El nombre debe contener al menos 5 caracteres';
    let descriptionLenght = 'La descripción debe contener al menos 20 caracteres';
    errors[0] = nameLenght;

    // calling fields
    let name = document.getElementById('name');
    let desc = document.querySelector('#description');
    let price = document.querySelector('#price');
    let disc = document.querySelector('#discount');
    let categ = document.querySelector('#categ');
    let subButtons = document.querySelector('#subButtons');
    let editButton = document.getElementById('editButton');
    let delButton = document.getElementById('delButton');

    // validations
    name.addEventListener('change', () => {
        if (name.value.length < 5) {
            errors[0] = nameLenght;
            alert(nameLenght);
            name.style.borderColor = 'red';
        } else {
            errors.splice(0, 1);
            name.style.borderColor = defaultStatus;
        };
        console.log(errors.length);
    });

    desc.addEventListener('change', () => {
        if (desc.value.length != 0 && desc.value.length < 20) {
            errors[1] = descriptionLenght
            alert(descriptionLenght);
            desc.style.borderColor = 'red';
        } else {
            errors.splice(1, 1);
            desc.style.borderColor = defaultStatus;
        };
        console.log(errors.length);
    });

    // Confirmación previa a ejecutar la edición del producto
    editButton.addEventListener('click', (event) => {

        // Check campos nombre y descripción
        console.log(errors.length);
        if (errors.length > 0) {
            alert(errors);
            event.preventDefault();
        } else {

            // Confirmación previa a ejecutar el delete
            let editMsg = 'Estás seguro de editar el producto?'
            let editConfirm = confirm(editMsg);
            if (editConfirm == true) {
                console.log(editConfirm);
            } else {
                event.preventDefault();
            }
        }


    })

    // Confirmación previa a ejecutar el delete
    delButton.addEventListener('click', (event) => {
        let deleteMsg = 'Estás seguro de BORRAR el producto?'
        let deleteConfirm = confirm(deleteMsg);
        if (deleteConfirm == true) {
            console.log(editConfirm);
        } else {
            event.preventDefault();
        }
    })

});