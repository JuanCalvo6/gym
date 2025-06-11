const pool = require('../config/db.js');

const getUsuario = async(usuario) =>{
    const [userFound] = await pool.query(
        `SELECT idAdministrador AS id, 'none' AS nombre, usuario, contraseña, 'admin' AS tipo 
        FROM administradores 
        WHERE usuario = ?
        UNION
        SELECT idProfesor AS id, CONCAT(apellidos, ', ', nombres ) AS nombre, usuario, contraseña, 'prof' AS tipo 
        FROM profesores 
        WHERE usuario = ? AND estado = "A"`,
        [usuario, usuario]
    );
    return userFound;
}

module.exports = {getUsuario};