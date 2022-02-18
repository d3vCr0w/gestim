const renderTickets = () => {
  const storedTicketIds = Object.keys(localStorage);

  $('#tabla tbody tr').remove();

  for (const ticketId of storedTicketIds) {
    const ticket = JSON.parse(localStorage.getItem(ticketId));
    $('#tabla tbody').append(`
        <tr>
            <td>${ticket.estado}</td>
            <td>${ticket.solicitante}</td>
            <td>${ticket.agente}</td>
            <td>${ticketId}</td>
            <td>${ticket.fechaSolicitud}</td>
            <td>${ticket.prioridad}</td>
            <td>${ticket.telefono}</td>
            <td>${ticket.email}</td>
            <td><button type="button" class="btn btn-primary" onClick="editTicket(${ticketId})">Editar</button ></td>
        </tr>
    `);
  }
};

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

  //llenar campos con jquery basados en el objeto ticket
  //hacer localstorage.setitem con el mismo ticketId para sobreescribir el que había guardado
  //llamar funcion renderTickets
  //limpiar form
  //mostrar swal que diga editado
};
$(function () {
  jQuery.validator.addMethod('lettersonly', function (value, element) {
    return this.optional(element) || /^[a-z ]+$/i.test(value);
  });

  $('#descriptionForm').validate({
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

  $('#guardarbtn').on('click', function () {
    if ($('#descriptionForm').valid()) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;

      localStorage.setItem(
        +new Date(),
        JSON.stringify({
          estado: 'Abierto',
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
      $('#descriptionForm')[0].reset();
      swal.fire({
        title: 'Información!',
        text: 'Ticket creado correctamente.',
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
