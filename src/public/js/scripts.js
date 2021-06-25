var contenido = document.querySelector("#empleadosLista");
var editar = document.querySelector("#editarForm");

//Obtengo Todos Los Empleados De La Base De Datos
//Usando Un Fetch Asyncrono
async function obtenerEmpleados() {
  await fetch("http://localhost:4000/api/empleados")
    .then((res) => res.json())
    .then((datos) => {
      tabla(datos.empleados);
    });
}

//Los Imprimo En La Tabla
function tabla(datos) {
  contenido.innerHTML = "";
  for (let valor of datos) {
    contenido.innerHTML += `
                
                <tr>
                    <th scope="row">${valor.legajo}</th>
                    <td>${valor.nombre}</td>
                    <td>${valor.apellido}</td>
                    <td>${valor.dni}</td>
                    <td>${valor.sector}</td>
                    <td>${valor.fechaIngreso}</td>
                    <td>${valor.activo}</td>
                    <td><button type="button" class="btn btn-danger"
                    onclick=eliminarEmpleado("${valor.legajo}")
                    >Eliminar</button></td>
                    
                    <td><a href="editarEmpleado.html?legajo=${
                      valor.legajo
                    }&apellido=${valor.apellido}&nombre=${
      valor.nombre
    }&sector=${valor.sector}&dni=${valor.dni}&fecha=${
      new Date(valor.fechaIngreso).toISOString().split("T")[0]
    }&activo=${valor.activo}">
                    <button type="button" class="btn btn-warning" 
                     onclick=editarEmpleado("${valor.legajo}") 
                    >Editar</button></a></td>
                   
                </tr>`;
  }
}

//Crear Empleado
async function readFormData() {
  var formData = {};
  formData["nombre"] = document.getElementById("nombre").value;
  formData["apellido"] = document.getElementById("apellido").value;
  formData["dni"] = document.getElementById("dni").value;
  formData["fechaIngreso"] = document.getElementById("fecha").value;
  formData["activo"] = document.getElementById("activo").value;
  formData["sector"] = document.getElementById("sector").value;

  console.log(formData);
  await fetch(`http://localhost:4000/api/empleados`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
  window.confirm("Empleado Agregado Con Exito!");
  resetForm();
  window.location.href = "http://localhost:4000/";
}

function resetForm() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("sector").value = "";
  document.getElementById("activo").value = "";
}

//Funcion Para Eliminar
async function eliminarEmpleado(id) {
  console.log("eliminar", id);
  try {
    if (confirm("Estas Seguro Que Desea Eliminar El Empleado?")) {
      await fetch(`http://localhost:4000/api/empleados/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => res.json());
      obtenerEmpleados();
    }
  } catch (error) {
    console.log(error);
  }
}
