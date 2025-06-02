const express = require('express');
const router = express.Router();

const { listarEjercicios,
        obtenerEjercicio,
        newEjercicio,
        darBajaEjercicio,
        darAltaEjercicio,
        deleteEjercicio} =  require('../controllers/ejerciciosController.js');


router.get('/ejercicios', listarEjercicios);
router.get('/ejercicios/:id', obtenerEjercicio);

router.post('/ejercicios', newEjercicio);

router.patch('/ejercicios/:id/baja', darBajaEjercicio);
router.patch('/ejercicios/:id/alta', darAltaEjercicio);

router.delete('/ejercicios/:id', deleteEjercicio);


module.exports = router;