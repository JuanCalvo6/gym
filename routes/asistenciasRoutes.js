const express = require('express');
const router = express.Router();
const { listarAsistencias,
        obtenerAsistencia,
        eliminarAsistencia} =  require('../controllers/asistenciasController.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);
router.use(validarRol("prof"));

router.get('/asistencias', listarAsistencias);
router.get('/asistencias/:id', obtenerAsistencia);

router.delete('/asistencias/:id', eliminarAsistencia);

module.exports = router;