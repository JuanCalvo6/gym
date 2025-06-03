const express = require('express');
const router = express.Router();
const { listarClientes,
        obtenerCliente,
        newCliente,
        updateCliente,
        darAltaCliente,
        darBajaCliente,
        deleteCliente} = require('../controllers/clientesController.js');
const validarCliente = require('../middlewares/validarCliente.js');

router.get('/clientes', listarClientes);
router.get('/clientes/:id',obtenerCliente);

router.post('/clientes',validarCliente, newCliente);

router.put('/clientes/:id',validarCliente, updateCliente);

router.patch('/clientes/:id/alta', darAltaCliente);
router.patch('/clientes/:id/baja', darBajaCliente);

router.delete('/clientes/:id', deleteCliente);

module.exports = router;