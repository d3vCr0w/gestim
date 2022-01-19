$(function () {
  $('#contactForm').validate({
    rules: {
      name: {
        required: true,
        lettersonly: true,
      },
      lastname: {
        required: true,
        lettersonly: true,
      },
      email: {
        required: true,
        email: true,
      },
      subject: 'required',
      message: 'required',
    },
    messages: {
      name: {
        required: 'Por favor ingrese su nombre',
        lettersonly: 'El nombre debe contener solo letras',
      },
      lastname: {
        required: 'Por favor ingrese sus apellidos',
        lettersonly: 'Los apellidos debe contener solo letras',
      },
      email: {
        required: 'Por favor ingrese su correo electrónico',
        email: 'Por favor ingrese un email válido',
      },
      subject: 'Por favor ingrese el asunto',
      message: 'Por favor ingrese el mensaje',
    },
  });

  $('#sendBtn').on('click', function () {
    $('#contactForm').valid();
  });
});
