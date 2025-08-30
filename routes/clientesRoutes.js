const express = require('express');
const router = express.Router();
const { listarClientes,
        obtenerCliente,
        crearCliente,
        modificarCliente,
        darAltaCliente,
        darBajaCliente,
        eliminarCliente} = require('../controllers/clientesController.js');
const { listarAsistenciasCliente,crearAsistenciaCliente,
        obtenerAsistenciaCliente} =  require('../controllers/asistenciasController.js');
const { listarInscripcionesCliente,
        obtenerInscripcionCliente,
        crearInscripcionCliente} = require('../controllers/inscripcionesController.js');
const { listarRutinasCliente, 
        obtenerRutinaCliente, 
        crearRutinaCliente} = require('../controllers/rutinasController.js');
const validarCliente = require('../middlewares/validarCliente.js');
const validarAsistencia = require('../middlewares/validarAsistencia.js');
const validarInscripcion = require('../middlewares/validarInscripcion.js');
const validarRutina =  require('../middlewares/validarRutina.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);
// router.use(validarRol("prof"));

router.get('/clientes', listarClientes);
router.get('/clientes/:id',obtenerCliente);
router.get('/clientes/:id/asistencias', listarAsistenciasCliente);
router.get('/clientes/:id/asistencias/:idAsistencia', obtenerAsistenciaCliente);
router.get('/clientes/:id/inscripciones', listarInscripcionesCliente);
router.get('/clientes/:id/inscripciones/:idInscripcion', obtenerInscripcionCliente);
router.get('/clientes/:id/rutinas', listarRutinasCliente);
router.get('/clientes/:id/rutinas/:idRutina', obtenerRutinaCliente);

router.post('/clientes',validarCliente, crearCliente);
router.post('/clientes/:id/asistencias', validarAsistencia, crearAsistenciaCliente);
router.post('/clientes/:id/inscripciones',validarInscripcion, crearInscripcionCliente);
router.post('/clientes/:id/rutinas', validarRutina, crearRutinaCliente);

router.put('/clientes/:id',validarCliente, modificarCliente);

router.patch('/clientes/:id/alta', darAltaCliente);
router.patch('/clientes/:id/baja', darBajaCliente);

router.delete('/clientes/:id', eliminarCliente);

module.exports = router;