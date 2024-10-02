const { Router } = require("express");
// const { check } = require("express-validator");

// const { validarCampos, tieneRole } = require("../middlewares");

const {
  tasksGet,
  tasksPost,
  tasksPut,
  tasksDelete,
} = require("../controllers/tasks");

// const {
//   esRoleValido,
//   emailExiste,
//   existeUsuarioPorId,
// } = require("../helpers/db-validators");

const router = Router();

router.get("/", tasksGet);
router.post("/", tasksPost);
router.put("/:id", tasksPut);
router.delete("/:id", tasksDelete);

// router.patch("/", usuariosPatch);

module.exports = router;
