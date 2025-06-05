const express = require('express');
const router = express.Router();
const { listarClientes,
        obtenerCliente,
        newCliente,
        updateCliente,
        darAltaCliente,
        darBajaCliente,
        deleteCliente} = require('../controllers/clientesController.js');
const { listarAsistenciasCliente,
        newAsistenciaCliente,
        obtenerAsistenciaCliente} =  require('../controllers/asistenciasController.js');
const { listarInscripcionesCliente,
        obtenerInscripcionCliente,
        newInscripcionCliente} = require('../controllers/inscripcionesController.js');
const { listarRutinasCliente, 
        obtenerRutinaCliente, 
        newRutinaCliente} = require('../controllers/rutinasController.js');
const validarCliente = require('../middlewares/validarCliente.js');
const validarAsistencia = require('../middlewares/validarAsistencia.js');
const validarInscripcion = require('../middlewares/validarInscripcion.js');
const validarRutina =  require('../middlewares/validarRutina.js');

router.get('/clientes', listarClientes);
router.get('/clientes/:id',obtenerCliente);
router.get('/clientes/:id/asistencias', listarAsistenciasCliente);
router.get('/clientes/:id/asistencias/:idAsistencia', obtenerAsistenciaCliente);
router.get('/clientes/:id/inscripciones', listarInscripcionesCliente);
router.get('/clientes/:id/inscripciones/:idInscripcion', obtenerInscripcionCliente);
router.get('/clientes/:id/rutinas', listarRutinasCliente);
router.get('/clientes/:id/rutinas/:idRutina', obtenerRutinaCliente);

router.post('/clientes',validarCliente, newCliente);
router.post('/clientes/:id/asistencias', validarAsistencia, newAsistenciaCliente);
router.post('/clientes/:id/inscripciones',validarInscripcion, newInscripcionCliente);
router.post('/clientes/:id/rutinas', validarRutina, newRutinaCliente);

router.put('/clientes/:id',validarCliente, updateCliente);

router.patch('/clientes/:id/alta', darAltaCliente);
router.patch('/clientes/:id/baja', darBajaCliente);

router.delete('/clientes/:id', deleteCliente);

module.exports = router;