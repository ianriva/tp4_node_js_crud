const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEmpleados,
  postEmpleados,
  putEmpleados,
  deleteEmpleados,
  getEmpleadoById,
} = require("../controllers/empleadosController");
const { existeIDEmpleado } = require("../helpers/validadores-db");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getEmpleados);

router.get("/:id", getEmpleadoById);

router.post(
  "/",
  [
    
    check("nombre", "Nombre Requerido").not().isEmpty(),
    check("apellido", "Apellido Requerido").not().isEmpty(),
    check("dni", "DNI Requerido").not().isEmpty(),
    check("sector", "Sector Requerido").not().isEmpty(),
    check("fechaIngreso", "Fecha Ingreso Requerido").not().isEmpty(),
   

    validarCampos,
  ],
  postEmpleados
);

router.put(
  "/:id",
  [
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDEmpleado),
    check("nombre", "Nombre Requerido").not().isEmpty(),
    check("apellido", "Apellido Requerido").not().isEmpty(),
    check("dni", "DNI Requerido").not().isEmpty(),
    check("sector", "Sector Requerido").not().isEmpty(),
    check("fechaIngreso", "Fecha Ingreso Requerido").not().isEmpty(),
    check("activo", "Activo Requerido").not().isEmpty(),
    

    validarCampos,
  ],
  putEmpleados
);

router.delete(
  "/:id",
  [
    check("id", "No Es Un ID Valido De Mongo").isMongoId(),
    check("id").custom(existeIDEmpleado),
    validarCampos,
  ],
  deleteEmpleados
);

module.exports = router;
