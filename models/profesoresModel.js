const pool = require('../config/db.js');

const findAllProfesores = async() =>{
    const [profesores] = await pool.query(
        `SELECT idProfesor, nombres, apellidos, dni, telefono, direccion, mail, estado, usuario
        FROM profesores`
    );
    return profesores;
}

const findProfesorById = async(id) =>{
    const [profesor] = await pool.query(
        `SELECT nombres, apellidos, dni, telefono, direccion, mail, estado
        FROM profesores
        WHERE idProfesor = ?`,
        [id]
    );
    return profesor;
}

const findProfesorByDniByUsuario = async(dni, usuario) =>{
    const [profesor] = await pool.query(
        `SELECT idProfesor
        FROM profesores
        WHERE dni = ? OR usuario = ?`,
        [dni, usuario]
    );
    return profesor;
}

const findProfesorByMail = async(mail) =>{
    const [profesor] = await pool.query(
        `SELECT idProfesor
        FROM profesores
        WHERE mail = ?`,
        [mail]
    );
    return profesor;
}

const insertProfesor = async(datos) =>{
    const [profesor] = await pool.query(
        `INSERT INTO profesores
        (nombres, apellidos, dni, telefono, direccion, mail, usuario, contraseña, estado)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, 'A')`,
        [datos.nombres, 
        datos.apellidos, 
        datos.dni, 
        datos.telefono, 
        datos.direccion, 
        datos.mail, 
        datos.usuario, 
        datos.contraseña]
    )
    return;
}

const updateProfesorById = async(datos,id) =>{
    await pool.query(
        `UPDATE profesores
        SET 
            nombres = ?,
            apellidos = ?,
            dni = ?,
            telefono = ?,
            direccion = ?,
            mail = ?,
            usuario = ?
        WHERE idProfesor = ?`,
        [datos.nombres, 
        datos.apellidos, 
        datos.dni, 
        datos.telefono, 
        datos.direccion, 
        datos.mail, 
        datos.usuario, 
        id]
    )
    return;
}

const updateContraseñaProfesorById = async(id, contraseña) =>{
    await pool.query(
        `UPDATE profesores
        SET contraseña = ?
        WHERE idProfesor = ?`,
        [contraseña, id]
    );

    return;
}

const updateBajaProfesorById = async(id) =>{
    await pool.query(
        `UPDATE profesores
        SET estado = 'B'
        WHERE idProfesor = ?`,
        [id]
    )
    return;
}

const updateAltaProfesorById = async(id) =>{
    await pool.query(
        `UPDATE profesores
        SET estado = 'A'
        WHERE idProfesor = ?`,
        [id]
    )
    return;
}

const deleteProfesorById = async(id) =>{
    await pool.query(
        `DELETE
        FROM profesores
        WHERE idProfesor = ?`,
        [id]
    )
    return;
}

module.exports = {
    findAllProfesores,
    findProfesorById,
    findProfesorByDniByUsuario,
    findProfesorByMail,
    insertProfesor,
    updateProfesorById,
    updateContraseñaProfesorById,
    updateBajaProfesorById,
    updateAltaProfesorById,
    deleteProfesorById
}