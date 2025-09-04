const express = require('express');
const router = express.Router();
const { listarAsistencias,
        obtenerAsistencia,
        eliminarAsistencia} =  require('../controllers/asistenciasController.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);

router.get('/asistencias',validarRol("prof"), listarAsistencias);
router.get('/asistencias/:id',validarRol("prof"), obtenerAsistencia);

router.delete('/asistencias/:id',validarRol("prof"), eliminarAsistencia);

module.exports = router;