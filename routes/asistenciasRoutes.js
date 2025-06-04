const express = require('express');
const router = express.Router();
const { listarAsistencias,
        obtenerAsistencia,
        eliminarAsistencia} =  require('../controllers/asistenciasController.js');

router.get('/asistencias', listarAsistencias);

router.get('/asistencias/:id', obtenerAsistencia);

router.delete('/asistencias/:id', eliminarAsistencia);

module.exports = router;