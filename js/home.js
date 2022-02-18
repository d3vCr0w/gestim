$(function () {
    // $('#descriptionForm').validate({
    //   rules: {
    //     name: {
    //       required: true,
    //       lettersonly: true,
    //     },
    //     lastname: {
    //       required: true,
    //       lettersonly: true,
    //     },
    //     email: {
    //       required: true,
    //       email: true,
    //     },
    //     subject: 'required',
    //     message: 'required',
    //   },
    //   messages: {
    //     name: {
    //       required: 'Por favor ingrese su nombre',
    //       lettersonly: 'El nombre debe contener solo letras',
    //     },
    //     lastname: {
    //       required: 'Por favor ingrese sus apellidos',
    //       lettersonly: 'Los apellidos debe contener solo letras',
    //     },
    //     email: {
    //       required: 'Por favor ingrese su correo electrónico',
    //       email: 'Por favor ingrese un email válido',
    //     },
    //     subject: 'Por favor ingrese el asunto',
    //     message: 'Por favor ingrese el mensaje',
    //   },
    // });
  
    $('#guardarbtn').on('click', function () {
    //   $('#contactForm').valid();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        localStorage.setItem(
            'ticket001',
            JSON.stringify({
                estado:"Abierto",
                solicitante: $("#name").val(),
                agente: $("#agent").val(),
                fechaSolicitud: today,
                prioridad: $("#prioridad").val(),
                telefono: $("#telefono").val(),
                email: $("#email").val(),
                descripcion: $("#description").val() 
            })

        );


    });

    



  });
  