const express = require('express');
const router = express.Router();
const { listarPases,
        obtenerPase,
        crearPase,
        modificarPase,
        darAltaPase,
        darBajaPase,
        eliminarPase} =  require('../controllers/pasesController.js');
const validarPase = require('../middlewares/validarPase.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);

router.get('/pases', listarPases);
router.get('/pases/:id', obtenerPase);

router.post('/pases', validarRol("admin"), validarPase, crearPase);

router.put('/pases/:id', validarRol("admin"), validarPase, modificarPase);

router.patch('/pases/:id/baja', validarRol("admin"), darBajaPase);
router.patch('/pases/:id/alta', validarRol("admin"),  darAltaPase);

router.delete('/pases/:id', validarRol("admin"), eliminarPase);

module.exports = router;