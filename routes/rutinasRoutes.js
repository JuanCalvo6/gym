const express = require('express');
const router = express.Router();
const { listarRutinas, 
        obtenerRutina,
        modificarRutina,
        darAltaRutina,
        darBajaRutina,
        eliminarRutina} = require('../controllers/rutinasController.js');
const { listarLineasDeRutinaRutina,
        obtenerLineaDeRutinaRutina,
        nuevaLineaDeRutinaRutina} = require('../controllers/lineasDeRutinaController.js');
const validarLineaDeRutina = require('../middlewares/validarLineaDeRutina.js')
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);       

router.get('/rutinas', validarRol("prof"), listarRutinas);
router.get('/rutinas/:id', validarRol("prof"), obtenerRutina);
router.get('/rutinas/:id/lineasDeRutina', validarRol("prof"), listarLineasDeRutinaRutina);
router.get('/rutinas/:id/lineasDeRutina/:idLinea', validarRol("prof"), obtenerLineaDeRutinaRutina);

router.post('/rutinas/:id/lineasDeRutina', validarRol("prof"), validarLineaDeRutina,  nuevaLineaDeRutinaRutina);

router.put('/rutinas/:id', validarRol("prof"), modificarRutina);

router.patch('/rutinas/:id/alta', validarRol("prof"), darAltaRutina);
router.patch('/rutinas/:id/baja', validarRol("prof"), darBajaRutina);

router.delete('/rutinas/:id', validarRol("prof"), eliminarRutina);

module.exports = router;