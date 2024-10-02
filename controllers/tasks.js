const { response, request } = require("express");
const fs = require("fs");

const Busquedas = require("../models/busquedas");
const context = "tasks";

const busquedas = new Busquedas();

const tasksGet = async (req = request, res = response) => {
  const { tasks } = busquedas.database;

  if (!tasks.length) {
    return res.status(204).json({ message: "No hay tareas" });
  }

  res.json({
    message: "lista de tareas",
    tasks,
  });
};

const tasksPut = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;

  busquedas
    .modificarDatabase(id, body, context)
    .then((result) => {
      if (result.valid) {
        res.json({ message: "tarea modificada", status: 200 });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const tasksPost = async (req, res = response) => {
  const newTask = req.body;

  busquedas
    .agregarDatabase(newTask, context)
    .then((result) => {
      if (result.valid) {
        res.status(201).json({ message: "tarea creada", status: 201 });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const tasksDelete = async (req, res = response) => {
  const { id } = req.params;

  busquedas.eliminarDatabase(id, context);

  res.json({ message: "tarea eliminada" });
};

// const usuariosPatch = (req, res = response) => {
//   res.json({
//     ok: true,
//     msg: "patch API - controlador",
//   });
// };

// const usuariosDelete = async (req, res = response) => {
//   const { id } = req.params;

//   // Logicamente lo borramos
//   const user = await User.findByIdAndUpdate(id, { status: false });

//   res.json(user);
// };

module.exports = {
  tasksGet,
  tasksPost,
  tasksPut,
  tasksDelete,
  // usuariosPatch,
};
