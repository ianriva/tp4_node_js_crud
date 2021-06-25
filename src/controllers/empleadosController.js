//Imports
const { response } = require("express");
const Empleado = require("../models/empleado");

//FUNCION GET DE EMPLEADOS
const getEmpleados = async (req, res = response) => {
  const empleados = await Empleado.find();

  res.status(200).json({
    status: true,
    msg: "Lista De Empledos",
    totalRegistros: empleados.length,
    empleados,
  });
};

const getEmpleadoById = async (req, res = response) => {
  const {id} = req.params;
  const empleado = await Empleado.findById({_id : id});

  res.status(200).json({
    status: true,
    msg: "Empleado",
    empleado,
  });
};

//FUNCION POST DEL EMPLEADO
const postEmpleados = async (req, res = response) => {
  const data = ({
    nombre,
    apellido,
    dni,
    sector,
    fechaIngreso,
    activo,
  } = req.body);

  const empleado = new Empleado(data);

  //Guardo El Usuario
  await empleado.save();
  res.status(200).json({
    status: true,
    msg: "Insertado Correctamente!",
    empleado,
  });
};

//FUNCION PUT DEL EMPLEADO
const putEmpleados = async (req, res = response) => {
  const { id } = req.params;
  const data = ({
    nombre,
    apellido,
    dni,
    sector,
    fechaIngreso,
    activo,
  } = req.body);

  const empleado = await Empleado.findByIdAndUpdate(id, data);

  res.status(200).json({
    msg: "Empleado Actualizado Correctamente!",
    id,
    empleado,
  });
};

const deleteEmpleados = async (req, res = response) => {
  const { id } = req.params;
  try {
    await Empleado.deleteOne({ _id: id });

    res.status(200).json({
      msg: `Empleado Eliminado!`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEmpleados,
  getEmpleadoById,
  postEmpleados,
  putEmpleados,
  deleteEmpleados,
};
