const express = require('express');
const router = express.Router();
const { listarClientes,
        obtenerCliente,
        newCliente,
        updateCliente,
        darAltaCliente,
        darBajaCliente,
        deleteCliente} = require('../controllers/clientesController.js');

router.get('/clientes', listarClientes);
router.get('/clientes/:id',obtenerCliente);

router.post('/clientes', newCliente);

router.put('/clientes/:id', updateCliente);

router.patch('/clientes/:id/alta', darAltaCliente);
router.patch('/clientes/:id/baja', darBajaCliente);

router.delete('/clientes/:id', deleteCliente);

module.exports = router;