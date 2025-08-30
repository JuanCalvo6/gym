const express = require('express');
const router = express.Router();

const { listarLineasDeRutinaRutina,
        obtenerLineaDeRutinaRutina,
        modificarLineaDeRutina,
        eliminarLineaDeRutina} = require('../controllers/lineasDeRutinaController.js');
const validarLineaDeRutina = require('../middlewares/validarLineaDeRutina.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);
// router.use(validarRol("prof"));

router.get('/lineasDeRutina', listarLineasDeRutinaRutina);
router.get('/lineasDeRutina/:id', obtenerLineaDeRutinaRutina);

router.put('/lineasDeRutina/:id',validarLineaDeRutina, modificarLineaDeRutina);

router.delete('/lineasDeRutina/:id', eliminarLineaDeRutina);

module.exports =  router;