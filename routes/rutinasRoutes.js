const express = require('express');
const router = express.Router();
const { listarRutinas, 
        obtenerRutina,
        actualizarRutina,
        darAltaRutina,
        darBajaRutina,
        eliminarRutina} = require('../controllers/rutinasController.js');
const { listarLineasDeRutina,
        obtenerLineaDeRutina,
        nuevaLineaDeRutina} = require('../controllers/lineasDeRutinaController.js');
const validarLineaDeRutina = require('../middlewares/validarLineaDeRutina.js')
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);       
// router.use(validarRol("admin"));

router.get('/rutinas', listarRutinas);
router.get('/rutinas/:id', obtenerRutina);
router.get('/rutinas/:id/lineasDeRutina', listarLineasDeRutina);
router.get('/rutinas/:id/lineasDeRutina/:idLinea', obtenerLineaDeRutina);

router.post('/rutinas/:id/lineasDeRutina',validarLineaDeRutina,  nuevaLineaDeRutina);

router.put('/rutinas/:id', actualizarRutina);

router.patch('/rutinas/:id/alta', darAltaRutina);
router.patch('/rutinas/:id/baja', darBajaRutina);

router.delete('/rutinas/:id', eliminarRutina);

module.exports = router;