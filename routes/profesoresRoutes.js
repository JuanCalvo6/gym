const express = require('express');
const { obtenerProfesor,
        listarProfesores,
         nuevoProfesor, 
         modificarProfesor, 
         darBajaProfesor, 
         darAltaProfesor, 
         eliminarProfesor } = require('../controllers/profesoresController');
const { validarToken } = require('../middlewares/validarToken');
const { validarRol} = require('../middlewares/validarRol.js');
const validarProfesor = require('../middlewares/validarProfesor.js');

const router = express.Router();

router.use(validarToken);

router.get('/profesores', listarProfesores);
router.get('/profesores/:id', obtenerProfesor);

router.post('/profesores', validarRol("admin"), validarProfesor, nuevoProfesor);

router.put('/profesores/:id', validarRol("admin"), modificarProfesor);

router.patch('/profesores/:id/baja', validarRol("admin"), darBajaProfesor);
router.patch('/profesores/:id/alta', validarRol("admin"), darAltaProfesor);

router.delete('/profesores/:id', validarRol("admin"), eliminarProfesor);

module.exports = router;