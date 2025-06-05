const express = require('express');
const router = express.Router();
const { listarRutinas, 
        obtenerRutina,
        actualizarRutina,
        darAltaRutina,
        darBajaRutina,
        eliminarRutina} = require('../controllers/rutinasController.js');

router.get('/rutinas', listarRutinas);
router.get('/rutinas/:id', obtenerRutina);

router.put('/rutinas/:id', actualizarRutina);

router.patch('/rutinas/:id/alta', darAltaRutina);
router.patch('/rutinas/:id/baja', darBajaRutina);

router.delete('/rutinas/:id', eliminarRutina);

module.exports = router;