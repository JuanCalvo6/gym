const express = require('express');
const router = express.Router();
const { listarPases,
        obtenerPase,
        newPase,
        updatePase,
        darAltaPase,
        darBajaPase,
        deletePase} =  require('../controllers/pasesController.js');
const validarPase = require('../middlewares/validarPase.js');
const { validarToken } = require('../middlewares/validarToken.js');
const { validarRol } = require('../middlewares/validarRol.js');

router.use(validarToken);
// router.use(validarRol("admin"));

router.get('/pases', listarPases);
router.get('/pases/:id', obtenerPase);

router.post('/pases',validarPase, newPase);

router.put('/pases/:id',validarPase, updatePase);

//Hasta aca funciona D:
router.patch('/pases/:id/baja', darBajaPase);
router.patch('/pases/:id/alta', darAltaPase);

router.delete('/pases/:id', deletePase);

module.exports = router;