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


router.get('/pases', listarPases);
router.get('/pases/:id', obtenerPase);

router.post('/pases',validarPase, newPase);

router.put('/pases/:id',validarPase, updatePase);

//Hasta aca funciona D:
router.patch('/pases/:id/baja', darBajaPase);
router.patch('/pases/:id/alta', darAltaPase);

router.delete('/pases/:id', deletePase);

module.exports = router;