const express = require('express');
const router = express.Router();
const {login, logout} = require('../controllers/autController.js');
const { validarToken } = require('../middlewares/validarToken.js');
const {validarLogin} = require('../middlewares/validarLogin.js');


router.post('/login',validarLogin, login);

router.post('/logout',validarToken, logout);

module.exports = router;