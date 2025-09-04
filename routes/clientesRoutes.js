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

router.get('/clientes', validarRol("prof"), listarClientes);
router.get('/clientes/:id', validarRol("prof"),obtenerCliente);
router.get('/clientes/:id/asistencias', validarRol("prof"), listarAsistenciasCliente);
router.get('/clientes/:id/asistencias/:idAsistencia', validarRol("prof"), obtenerAsistenciaCliente);
router.get('/clientes/:id/inscripciones', validarRol("prof"), listarInscripcionesCliente);
router.get('/clientes/:id/inscripciones/:idInscripcion', validarRol("prof"), obtenerInscripcionCliente);
router.get('/clientes/:id/rutinas', validarRol("prof"), listarRutinasCliente);
router.get('/clientes/:id/rutinas/:idRutina', validarRol("prof"), obtenerRutinaCliente);

router.post('/clientes', validarRol("prof"), validarCliente, crearCliente);
router.post('/clientes/:id/asistencias', validarRol("prof"), validarAsistencia, crearAsistenciaCliente);
router.post('/clientes/:id/inscripciones', validarRol("prof"), validarInscripcion, crearInscripcionCliente);
router.post('/clientes/:id/rutinas', validarRol("prof"), validarRutina, crearRutinaCliente);

router.put('/clientes/:id', validarRol("prof"), validarCliente, modificarCliente);

router.patch('/clientes/:id/alta', validarRol("prof"), darAltaCliente);
router.patch('/clientes/:id/baja', validarRol("prof"), darBajaCliente);

router.delete('/clientes/:id', validarRol("prof"), eliminarCliente);

module.exports = router;