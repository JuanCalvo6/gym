require('dotenv').config();
const bcrypt = require('bcryptjs');
const { getUsuario } = require('../models/autModel');
const {generarToken} = require('../utils/generarToken.js')

const login = async(req, res) =>{
    const {usuario, contraseña} = req.body;

    try {
        const userFound = await getUsuario(usuario);

        if(userFound.length === 0) return res.status(400).json({message: 'Datos incorrectos'});
        const contraseñaHash = userFound[0].contraseña;

        const isMatch = await bcrypt.compare(contraseña,contraseñaHash);

        if(!isMatch) return res.status(400).json({message: 'Datos incorrectos'});

        const {usuario: user, tipo} =  userFound[0];
        const token = await generarToken({
            usuario: user,
            tipo: tipo
        });
        res.cookie('token', token)
        res.send(userFound[0]);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const logout = async(req, res) =>{
    res.cookie('token', "");
    return res.status(200).json({message: "Sesión Cerrada"});
}

module.exports = {
    login,
    logout
};