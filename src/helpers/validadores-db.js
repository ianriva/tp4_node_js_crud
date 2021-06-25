const Empleado = require("../models/empleado");

const existeIDEmpleado = async (id = "") => {
  const existe = await Empleado.findById(id);
  if (!existe) {
    throw new Error(`El ID ${id} No Existe!!`);
  }
};

module.exports = {
  existeIDEmpleado,
};
