function randomNticket(length) {
  var result = '';
  var characters = '1234567890';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


window.addEventListener('load', () => {

  const params = (new URL(document.location)).searchParams;
  const name = params.get('name');
  const email = params.get('email');
  const telefono = params.get('telefono');
  const estado = "abierto";
  const agent = params.get('agent');
  const numero = randomNticket(4);
  const fecha = Date.now();
  const prioridad = params.get('prioridad');
  const descripcion = params.get('descripcion');
  const edicion = ' <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editarModal">Editar</button >';

  var registro = "<tr>" +
    "<td>" + estado + "</td>" +
    "<td>" + name + "</td>" +
    "<td>" + agent + "</td>" +
    "<td>" + numero + "</td>" +
    "<td>" + fecha + "</td>" +
    "<td>" + prioridad + "</td>" +
    "<td>" + telefono + "</td>" +
    "<td>" + email + "</td>" +
    "<td>" + descripcion + "</td>" +
    "<td>" + edicion + "</td>" +
    "</tr>"

  $("#tabla tbody").append(registro);




})



