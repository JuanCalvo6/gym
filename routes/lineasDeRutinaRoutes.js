const express = require('express');
const router = express.Router();

const { listarLineas,
        obtenerLinea,
        modificarLineaDeRutina,
        eliminarLineasDeRutina} = require('../controllers/lineasDeRutinaController.js');
const validarLineaDeRutina = require('../middlewares/validarLineaDeRutina.js');

router.get('/lineasDeRutina', listarLineas);
router.get('/lineasDeRutina/:id', obtenerLinea);

router.put('/lineasDeRutina/:id',validarLineaDeRutina, modificarLineaDeRutina);

router.delete('/lineasDeRutina/:id', eliminarLineasDeRutina);

module.exports =  router;