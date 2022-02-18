$(() => {
  $('#loginForm').validate({
    rules: {
      userName: {
        required: true,
      },
      password: {
        required: true,
        maxlength: 20,
        minlength: 5,
      },
    },
    messages: {
      userName: {
        required: 'Por favor ingrese su usuario',
      },
      password: {
        required: 'Por favor ingrese su contraseña',
        maxlength: 'La contraseña debe ser de máximo 20 caracteres',
        minlength: 'La longitud debe ser de mínimo 5 caracteres',
      },
    },
  });

  $('#btnLogin').on('click', (e) => {
    e.preventDefault();
    if ($('#loginForm').valid()) {
      const userName = $('#userName').val();
      const password = $('#password').val();

      const credentials = {
        admin: {
          password: 'admin123',
          role: 'admin',
        },
        usuario: {
          password: 'user123',
          role: 'user',
        },
      };
      const validLogin =
        credentials[userName] !== undefined &&
        credentials[userName].password === password;

      if (validLogin) {
        location.href = 'home.html';
      } else {
        swal
          .fire({
            title: 'Alerta',
            text: 'Credenciales incorrectas.',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2493bf',
          })
          .then(() => {
            $('#loginForm')[0].reset();
            $('#userName').focus();
          });
      }
    }
  });
});
