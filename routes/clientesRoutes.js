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
const validarCliente = require('../middlewares/validarCliente.js');
const validarAsistencia = require('../middlewares/validarAsistencia.js');

router.get('/clientes', listarClientes);
router.get('/clientes/:id',obtenerCliente);
router.get('/clientes/:id/asistencias', listarAsistenciasCliente);
router.get('/clientes/:id/asistencias/:idAsistencia', obtenerAsistenciaCliente);

router.post('/clientes',validarCliente, newCliente);
router.post('/clientes/:id/asistencias', validarAsistencia, newAsistenciaCliente);

router.put('/clientes/:id',validarCliente, updateCliente);

router.patch('/clientes/:id/alta', darAltaCliente);
router.patch('/clientes/:id/baja', darBajaCliente);

router.delete('/clientes/:id', deleteCliente);

module.exports = router;