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
// router.use(validarRol("admin"));

router.get('/rutinas', listarRutinas);
router.get('/rutinas/:id', obtenerRutina);
router.get('/rutinas/:id/lineasDeRutina', listarLineasDeRutinaRutina);
router.get('/rutinas/:id/lineasDeRutina/:idLinea', obtenerLineaDeRutinaRutina);

router.post('/rutinas/:id/lineasDeRutina',validarLineaDeRutina,  nuevaLineaDeRutinaRutina);

router.put('/rutinas/:id', modificarRutina);

router.patch('/rutinas/:id/alta', darAltaRutina);
router.patch('/rutinas/:id/baja', darBajaRutina);

router.delete('/rutinas/:id', eliminarRutina);

module.exports = router;