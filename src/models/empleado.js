const { Schema, model } = require("mongoose");

const EmpleadoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre Es Requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El Apellido Es Requerido"],
  },
  dni: {
    type: Number,
    required: [false, "El DNI Es Requerido"],
    default: 0,
  },
  sector: {
    type: String,
    required: [true, "El Sector Es Requerido"],
  },
  fechaIngreso: {
    type: Date,

    required: [false, "La Fecha De Ingreso Es Requerida"],
  },
  activo: {
    type: Boolean,
    required: [false, "El Estado Activo Es Requerido"],
  },
});

//Todo Lo Agregado Aqui Se Excluye Del Response...
EmpleadoSchema.methods.toJSON = function () {
  const { __v,_id ,...empleado } = this.toObject();
  empleado.legajo = _id;

  return empleado;
};

module.exports = model("Empleado", EmpleadoSchema);
