window.addEventListener("submit", () => {
    
  const formulario = document.getElementById("formulario");
  
  if (formulario.checkValidity()) {
    const entradas = formulario.getElementsByTagName("input");
    const usuario = entradas[0].value;
    const contra = entradas[1].value;
    
    const credenciales = {
      admin: {
        contra: "admin123",
        rol: "admin",
      },
      usuario: {
        contra: "usuario123",
        rol: "usuario",
      },
    };
    const valido =
      credenciales[usuario] !== undefined &&
      credenciales[usuario].contra === contra;

    if (valido) {
        location.assign("home.html");
    } else {
      alert("Usuario o Contraseña incorrectos");
    }
  }
});
