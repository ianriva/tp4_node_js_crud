// EDITAR UN ELEMENTO
let formulario = document.getElementById("editarForm");
let params = new URLSearchParams(location.search);
let legajo = params.get("legajo");
let apellido = params.get("apellido");
document.getElementById("apellidoEdit").value = apellido;
let nombre = params.get("nombre");
document.getElementById("nombreEdit").value = nombre;
let dni = params.get("dni");
document.getElementById("dniEdit").value = dni;
let sector = params.get("sector");
document.getElementById("sectorEdit").value = sector;
let fecha = params.get("fecha");
document.getElementById("fechaEdit").value = fecha;



//Editar Empleado
async function readFormData() {
    var formData = {};
    formData["nombre"] = document.getElementById("nombreEdit").value;
    formData["apellido"] = document.getElementById("apellidoEdit").value;
    formData["dni"] = document.getElementById("dniEdit").value;
    formData["fechaIngreso"] = document.getElementById("fechaEdit").value;
    formData["activo"] = document.getElementById("activoEdit").value;
    formData["sector"] = document.getElementById("sectorEdit").value;
  
    console.log(formData);
    await fetch(`http://localhost:4000/api/empleados/${legajo}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    window.confirm("Empleado Editado Con Exito!");
    window.location.href = "http://localhost:4000/";
  }