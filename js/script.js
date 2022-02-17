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

    const params = (new URL (document.location)).searchParams;
    const name = params.get('name');
    const email = params.get('email');
    const telefono = params.get('telefono');
    const estado = "abierto";
    const agent = params.get('agent');
    const numero = randomNticket(4);
    const fecha = Date.now();
    const prioridad = params.get('prioridad');
    const descripcion = params.get('descripcion');

   // document.getElementById('estado1').innerHTML = estado;
    // document.getElementById('name1').innerHTML = name;
    // document.getElementById('agent1').innerHTML = agent;
    // document.getElementById('email1').innerHTML = email;
    // document.getElementById('telefono1').innerHTML = telefono;
    // document.getElementById('numero1').innerHTML = numero;
    // document.getElementById('fecha1').innerHTML = fecha;
    // document.getElementById('prioridad1').innerHTML = prioridad;
    // document.getElementById('descripcion1').innerHTML = descripcion;
    
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
    "</tr>"

    $("#tabla tbody").append(registro);

    // $('#tabla tbody').append(`
    //     <tr>
    //       <td>${estado}</td>
    //       <td>${name1}</td>
    //       <td>${agent1}</td>
    //       <td>${numero1}</td> 
    //       <td>${fecha1}</td>
    //       <td>${prioridad1}</td>
    //       <td>${telefono1}</td>
    //       <td>${email1}</td>
    //       <td>${descripcion1}</td>

    //     </tr>
    //   `);


      

} )



