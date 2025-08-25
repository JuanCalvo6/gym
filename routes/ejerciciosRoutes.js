const express = require('express');
const router = express.Router();

const { listarEjercicios,
        obtenerEjercicio,
        newEjercicio,
        modificarEjercicio,
        darBajaEjercicio,
        darAltaEjercicio,
        deleteEjercicio} =  require('../controllers/ejerciciosController.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);
// router.use(validarRol("admin"));

router.get('/ejercicios', listarEjercicios);
router.get('/ejercicios/:id', obtenerEjercicio);

router.post('/ejercicios', newEjercicio);

router.put('/ejercicios/:id', modificarEjercicio)

router.patch('/ejercicios/:id/baja', darBajaEjercicio);
router.patch('/ejercicios/:id/alta', darAltaEjercicio);

router.delete('/ejercicios/:id', deleteEjercicio);


module.exports = router;