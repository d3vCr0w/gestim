window.addEventListener('submit', (e) => {
  const formulario = document.getElementById('formulario');
  e.preventDefault();
  if (formulario.checkValidity()) {
    const entradas = formulario.getElementsByTagName('input');
    const usuario = entradas[0].value;
    const contra = entradas[1].value;

    const credenciales = {
      admin: {
        contra: 'admin123',
        rol: 'admin',
      },
      usuario: {
        contra: 'usuario123',
        rol: 'usuario',
      },
    };
    const valido =
      credenciales[usuario] !== undefined &&
      credenciales[usuario].contra === contra;

    if (valido) {
      location.href = 'home.html';
    } else {
      swal.fire({
        title: 'Alerta!',
        text: 'Credenciales incorrectas',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }
});
