const pool = require('../config/db.js');

const getProfesores = async() =>{
    const [profesores] = await pool.query(
        `SELECT nombres, apellidos, dni, telefono, direccion, mail, estado
        FROM profesores`
    );
    return profesores;
}

const getProfesorById = async(id) =>{
    const [profesor] = await pool.query(
        `SELECT nombres, apellidos, dni, telefono, direccion, mail, estado
        FROM profesores
        WHERE idProfesor = ?`,
        [id]
    );
    return profesor;
}

const getProfesorByDniUsuario = async(dni, usuario) =>{
    const [profesor] = await pool.query(
        `SELECT idProfesor
        FROM profesores
        WHERE dni = ? OR usuario = ?`,
        [dni, usuario]
    );
    return profesor;
}

const crearProfesor = async(datos) =>{
    const [profesor] = await pool.query(
        `INSERT INTO profesores
        (nombres, apellidos, dni, telefono, direccion, mail, usuario, contraseña, estado)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [datos.nombres, 
        datos.apellidos, 
        datos.dni, 
        datos.telefono, 
        datos.direccion, 
        datos.mail, 
        datos.usuario, 
        datos.contraseña, 
        datos.estado]
    )
    return;
}

const modificarProfesor = async(datos,id) =>{
    await pool.query(
        `UPDATE profesores
        SET 
            nombres = ?,
            apellidos = ?,
            dni = ?,
            telefono = ?,
            direccion = ?,
            mail = ?,
            usuario = ?,
            contraseña = ?,
            estado = ?
        WHERE idProfesor = ?`,
        [datos.nombres, 
        datos.apellidos, 
        datos.dni, 
        datos.telefono, 
        datos.direccion, 
        datos.mail, 
        datos.usuario, 
        datos.contraseña, 
        datos.estado,
        id]
    )
    return;
}

const darBaja = async(id) =>{
    await pool.query(
        `UPDATE profesores
        SET estado = 'B'
        WHERE idProfesor = ?`,
        [id]
    )
    return;
}

const darAlta = async(id) =>{
    await pool.query(
        `UPDATE profesores
        SET estado = 'A'
        WHERE idProfesor = ?`,
        [id]
    )
    return;
}

const eliminarProfesor = async(id) =>{
    await pool.query(
        `DELETE
        FROM profesores
        WHERE idProfesor = ?`,
        [id]
    )
    return;
}

module.exports = {
    getProfesores,
    getProfesorById,
    getProfesorByDniUsuario,
    crearProfesor,
    modificarProfesor,
    darBaja,
    darAlta,
    eliminarProfesor
}