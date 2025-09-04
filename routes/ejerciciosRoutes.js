const express = require('express');
const router = express.Router();

const { listarEjercicios,
        obtenerEjercicio,
        nuevoEjercicio,
        modificarEjercicio,
        darBajaEjercicio,
        darAltaEjercicio,
        eliminarEjercicio} =  require('../controllers/ejerciciosController.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);

router.get('/ejercicios', listarEjercicios);
router.get('/ejercicios/:id', obtenerEjercicio);

router.post('/ejercicios', validarRol("admin"), nuevoEjercicio);

router.put('/ejercicios/:id', validarRol("admin"), modificarEjercicio)

router.patch('/ejercicios/:id/baja', validarRol("admin"), darBajaEjercicio);
router.patch('/ejercicios/:id/alta', validarRol("admin"), darAltaEjercicio);

router.delete('/ejercicios/:id', validarRol("admin"), eliminarEjercicio);


module.exports = router;