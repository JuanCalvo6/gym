const express = require('express');
const { obtenerProfesor,
        listarProfesores,
         newProfesor, 
         updateProfesor, 
         darBajaProfesor, 
         darAltaProfesor, 
         deleteProfesor } = require('../controllers/profesoresController');
const { validarToken } = require('../middlewares/validarToken');
const { validarRol} = require('../middlewares/validarRol.js');
const validarProfesor = require('../middlewares/validarProfesor.js');

const router = express.Router();

router.use(validarToken);
// router.use(validarRol("admin"));

router.get('/profesores', listarProfesores);
router.get('/profesores/:id', obtenerProfesor);

router.post('/profesores',validarProfesor, newProfesor);

router.put('/profesores/:id',validarProfesor, updateProfesor);

router.patch('/profesores/:id/baja', darBajaProfesor);
router.patch('/profesores/:id/alta', darAltaProfesor);

router.delete('/profesores/:id', deleteProfesor);

module.exports = router;