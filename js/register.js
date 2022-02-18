$(function () {
  $('#registerForm').validate({
    rules: {
      firstName: {
        required: true,
        lettersonly: true,
      },
      lastName: {
        required: true,
        lettersonly: true,
      },
      secondLastName: {
        required: true,
        lettersonly: true,
      },
      phone: {
        required: true,
        digits: true,
        maxlength: 10,
        minlength: 7,
      },
      email: {
        required: true,
        email: true,
      },
      pass: {
        required: true,
        maxlength: 20,
        minlength: 5,
      },
      gender: 'required',
      repass: {
        required: true,
        equalTo: '#pass',
      },
      address: 'required',
    },
    messages: {
      firstName: {
        required: 'Por favor ingrese su primer nombre',
        lettersonly: 'El primer nombre debe contener solo letras',
      },
      lastName: {
        required: 'Por favor ingrese su primer apellido',
        lettersonly: 'El primer apellido debe contener solo letras',
      },
      secondLastName: {
        required: 'Por favor ingrese su segundo apellido',
        lettersonly: 'El segundo apellido debe contener solo letras',
      },
      phone: {
        required: 'Por favor ingrese su Teléfono',
        digits: 'El teléfono debe contener solo números',
        maxlength: 'La longitud debe ser de máximo 10 dígitos',
        minlength: 'La longitud debe ser de mínimo 7 dígitos',
      },
      email: {
        required: 'Por favor ingrese su correo electrónico',
        email: 'Por favor ingrese un email válido',
      },
      pass: {
        required: 'Por favor ingrese una contraseña',
        maxlength: 'La contraseña debe ser de máximo 20 caracteres',
        minlength: 'La longitud debe ser de mínimo 5 caracteres',
      },
      repass: {
        required: 'Por favor confirme su contraseña',
        equalTo: 'Las contraseñas deben coincidir',
      },
      gender: 'Por favor seleccione su género',
      address: 'Por favor ingrese su dirección',
    },
  });

  $('#btnRegister').on('click', () => {
    if ($('#registerForm').valid()) {
      swal
        .fire({
          title: 'Mensaje!',
          text: 'Gracias por registrarse',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        .then(() => {
          location.href = '../index.html';
        });
    } else {
      swal.fire({
        title: '¡Error!',
        text: 'Por favor verifique los errores generados.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2493bf',
      });
    }
  });
});
