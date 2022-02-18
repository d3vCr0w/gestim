const renderTickets = (status) => {
  const storedTicketIds = Object.keys(localStorage);

  $('#tabla tbody tr').remove();

  for (const ticketId of storedTicketIds) {
    const ticket = JSON.parse(localStorage.getItem(ticketId));

    if (status) {
      if (ticket.estado !== status) continue;
    }
    $('#tabla tbody').append(`
        <tr>
            <td>${
              ticket.estado.charAt(0).toUpperCase() + ticket.estado.slice(1)
            }</td>
            <td>${ticket.solicitante}</td>
            <td>${
              ticket.agente.charAt(0).toUpperCase() + ticket.agente.slice(1)
            }</td>
            <td>${ticketId}</td>
            <td>${ticket.fechaSolicitud}</td>
            <td>${
              ticket.prioridad.charAt(0).toUpperCase() +
              ticket.prioridad.slice(1)
            }</td>
            <td>${ticket.telefono}</td>
            <td>${ticket.email}</td>
            <td>
              <button type="button" class="btn btn-primary" onClick="editTicket(${ticketId})">Editar</button >
              <button type="button" class="btn btn-primary" onClick="showTicket(${ticketId})">Ver</button >
            </td>
        </tr>
    `);
  }
};

const editTicket = (ticketId) => {
  const ticket = JSON.parse(localStorage.getItem(ticketId));

  $('#ticketId').val(ticketId);
  $('#edit_name').val(ticket.solicitante);
  $('#edit_fecha_solicitud').val(ticket.fechaSolicitud);
  $('#edit_agente').val(ticket.agente);
  $('#edit_prioridad').val(ticket.prioridad);
  $('#edit_telefono').val(ticket.telefono);
  $('#edit_email').val(ticket.email);
  $('#edit_description').text(ticket.descripcion);
  $('#editarModal').modal('show');
};

const changeStatus = (ticketId) => {};

const showTicket = (ticketId) => {
  const ticket = JSON.parse(localStorage.getItem(ticketId));

  $('#viewName').val(ticket.solicitante);
  $('#viewAgente').val(
    ticket.agente.charAt(0).toUpperCase() + ticket.agente.slice(1)
  );
  $('#viewPrioridad').val(
    ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)
  );
  $('#viewTelefono').val(ticket.telefono);
  $('#viewEmail').val(ticket.email);
  $('#viewDescription').text(ticket.descripcion);
  $('#viewTicket').modal('show');
};

$(function () {
  renderTickets();
  jQuery.validator.addMethod('lettersonly', function (value, element) {
    return this.optional(element) || /^[a-z ]+$/i.test(value);
  });

  $('#newTicketForm').validate({
    rules: {
      name: {
        required: true,
        lettersonly: true,
      },
      telefono: {
        required: true,
        digits: true,
        maxlength: 10,
        minlength: 7,
      },
      email: {
        required: true,
        email: true,
      },
      agent: 'required',
      prioridad: 'required',
      description: 'required',
    },
    messages: {
      name: {
        required: 'Por favor ingrese su nombre',
        lettersonly: 'El nombre debe contener solo letras',
      },
      telefono: {
        required: 'Por favor ingrese su Teléfono',
        digits: 'El teléfono debe contener solo números',
        maxlength: 'La longitud debe ser de máximo 10 dígitos',
        minlength: 'La longitud debe ser de mínimo 7 dígitos',
      },
      email: {
        required: 'Por favor ingrese su correo electrónico',
        email: 'Por favor ingrese un email válido',
      },
      agent: 'Por favor seleccione un agente',
      prioridad: 'Por favor seleccione una prioridad',
      description: 'Por favor ingrese una descripción',
    },
  });

  $('#editTicketForm').validate({
    rules: {
      edit_name: {
        required: true,
        lettersonly: true,
      },
      edit_telefono: {
        required: true,
        digits: true,
        maxlength: 10,
        minlength: 7,
      },
      edit_email: {
        required: true,
        email: true,
      },
      edit_agente: 'required',
      edit_prioridad: 'required',
      edit_description: 'required',
    },
    messages: {
      edit_name: {
        required: 'Por favor ingrese su nombre',
        lettersonly: 'El nombre debe contener solo letras',
      },
      edit_telefono: {
        required: 'Por favor ingrese su Teléfono',
        digits: 'El teléfono debe contener solo números',
        maxlength: 'La longitud debe ser de máximo 10 dígitos',
        minlength: 'La longitud debe ser de mínimo 7 dígitos',
      },
      edit_email: {
        required: 'Por favor ingrese su correo electrónico',
        email: 'Por favor ingrese un email válido',
      },
      edit_agente: 'Por favor seleccione un agente',
      edit_prioridad: 'Por favor seleccione una prioridad',
      edit_description: 'Por favor ingrese una descripción',
    },
  });

  $('#guardarbtn').on('click', function () {
    if ($('#newTicketForm').valid()) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;

      localStorage.setItem(
        +new Date(),
        JSON.stringify({
          estado: 'abierto',
          solicitante: $('#name').val(),
          agente: $('#agent').val(),
          fechaSolicitud: today,
          prioridad: $('#prioridad').val(),
          telefono: $('#telefono').val(),
          email: $('#email').val(),
          descripcion: $('#description').val(),
        })
      );
      $('#nuevoModal').modal('hide');
      $('#newTicketForm')[0].reset();
      swal.fire({
        title: 'Información',
        text: '¡Ticket creado correctamente!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2493bf',
      });
      renderTickets();
    } else {
      swal.fire({
        title: '¡Error!',
        text: 'Por favor verifique los errores generados.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2493bf',
      });
      return false;
    }
  });

  $('#editBtn').on('click', function () {
    if ($('#editTicketForm').valid()) {
      localStorage.setItem(
        $('#ticketId').val(),
        JSON.stringify({
          estado: 'abierto', //TODO: Agregar select para cambio de estado en el formulario editar
          solicitante: $('#edit_name').val(),
          agente: $('#edit_agente').val(),
          fechaSolicitud: $('#edit_fecha_solicitud').val(),
          prioridad: $('#edit_prioridad').val(),
          telefono: $('#edit_telefono').val(),
          email: $('#edit_email').val(),
          descripcion: $('#edit_description').val(),
        })
      );
      $('#editarModal').modal('hide');
      $('#editTicketForm')[0].reset();
      renderTickets();
      swal.fire({
        title: 'Información',
        text: '¡Ticket modificado correctamente!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2493bf',
      });
    } else {
      swal.fire({
        title: '¡Error!',
        text: 'Por favor verifique los errores generados.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2493bf',
      });
      return false;
    }
  });
});

const editTicket = (ticketId) => {
  const ticket = JSON.parse(localStorage.getItem(ticketId));
  console.log(ticket);
  $('#editarModal').modal('show');

  document.getElementById('ticket1').value = ticketId;
  document.getElementById('fecha1').value = ticket.fechaSolicitud;
  document.getElementById('estado1').value = ticket.estado;
  document.getElementById('prioridad1').value = ticket.prioridad;
  document.getElementById('telefono1').value = ticket.telefono;
  document.getElementById('email1').value = ticket.email;
  document.getElementById('agente1').value = ticket.agente;
  document.getElementById('solicitante1').value = ticket.solicitante;
  document.getElementById('descripcion1').value = ticket.descripcion;

  $(function () {
    jQuery.validator.addMethod('lettersonly', function (value, element) {
      return this.optional(element) || /^[a-z ]+$/i.test(value);
    });

    $('#descriptionForm1').validate({
      rules: {
        estado1: {
          required: true,
          lettersonly: true,
        },
        solicitante1: {
          required: true,
          lettersonly: true,
        },
        telefono1: {
          required: true,
          digits: true,
          maxlength: 10,
          minlength: 7,
        },
        email1: {
          required: true,
          email1: true,
        },
        agente1: 'required',
        prioridad1: 'required',
        descripcion1: 'required',
      },
      messages: {
        estado1: {
          required: 'Por favor seleccione un estado',
          lettersonly: 'El estado debe contener solo letras',
        },
        solicitante1: {
          required: 'Por favor ingrese su nombre',
          lettersonly: 'El nombre debe contener solo letras',
        },
        telefono1: {
          required: 'Por favor ingrese su Teléfono',
          digits: 'El teléfono debe contener solo números',
          maxlength: 'La longitud debe ser de máximo 10 dígitos',
          minlength: 'La longitud debe ser de mínimo 7 dígitos',
        },
        email1: {
          required: 'Por favor ingrese su correo electrónico',
          email1: 'Por favor ingrese un email válido',
        },
        agente1: 'Por favor seleccione un agente',
        prioridad1: 'Por favor seleccione una prioridad',
        descripcion1: 'Por favor ingrese una descripción',
      },
    });

    $('#editarbtn').on('click', function () {
      if ($('#descriptionForm1').valid()) {
        localStorage.setItem(
          +ticketId,
          JSON.stringify({
            estado: $('#estado1').val(),
            solicitante: $('#solicitante1').val(),
            agente: $('#agente1').val(),
            fechaSolicitud: $('#fecha1').val(),
            prioridad: $('#prioridad1').val(),
            telefono: $('#telefono1').val(),
            email: $('#email1').val(),
            descripcion: $('#descripcion1').val(),
          })
        );
        $('#editarModal').modal('hide');
        $('#descriptionForm1')[0].reset();
        swal.fire({
          title: 'Información!',
          text: 'Ticket editado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        renderTickets();
      } else {
        swal.fire({
          title: 'Error!',
          text: 'Por favor ingrese todos los datos',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return false;
      }
    });
  });

  //llamar funcion renderTickets
  //limpiar form
  //mostrar swal que diga editado
};
