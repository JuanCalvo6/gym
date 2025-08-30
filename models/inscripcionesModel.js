const pool = require('../config/db.js');

const findAllInscripciones  = async() =>{
    const [inscripciones] = await pool.query(
        `SELECT idInscripcion, idProfesor, idCliente, idPase, diaInicio AS inicio ,diaFin AS fin, precio, estado
        FROM inscripciones`
    );
    return inscripciones;
}

const findInscripcionById = async(id) =>{
    const [inscripcion] = await pool.query(
        `SELECT 
	        inscripciones.idProfesor,
            inscripciones.idCliente,
            pases.nombre AS pase,
            inscripciones.idPase,
            inscripciones.diaInicio AS inicio,
            inscripciones.diaFin AS fin, 
            inscripciones.precio,
            inscripciones.estado
        FROM inscripciones
        JOIN pases ON inscripciones.idPase = pases.idPase
        WHERE inscripciones.idInscripcion = ?`,
        [id]
    );
    return inscripcion;
}

const findInscripcionesByIdCliente = async(id) =>{
    const [inscripciones] = await pool.query(
        `SELECT 
	        inscripciones.idInscripcion,
            inscripciones.idProfesor,
            inscripciones.idPase,
            pases.nombre AS pase,
            inscripciones.diaInicio AS inicio,
            inscripciones.diaFin AS fin, 
            inscripciones.precio,
            inscripciones.estado
        FROM inscripciones
        JOIN pases ON inscripciones.idPase = pases.idPase
        WHERE inscripciones.idCliente = ?
        ORDER BY inscripciones.estado`,
        [id]
    );
    return inscripciones;
}

const findAltaInscripcionesByIdCliente = async(id) =>{
    const [inscripciones] = await pool.query(
        `SELECT 
	        inscripciones.idInscripcion,
            inscripciones.idProfesor,
            pases.nombre AS pase,
            inscripciones.diaInicio AS inicio,
            inscripciones.diaFin AS fin, 
            inscripciones.precio,
            inscripciones.estado
        FROM inscripciones
        JOIN pases ON inscripciones.idPase = pases.idPase
        WHERE inscripciones.idCliente = ? AND inscripciones.estado = 'A'`,
        [id]
    );
    return inscripciones;
}

const findInscripcionByIdByIdCliente = async(idCliente, idInscripcion) =>{
    const [inscripcion] = await pool.query(
        `SELECT idProfesor, idPase, diaInicio AS inicio ,diaFin AS fin, precio, estado
        FROM inscripciones
        WHERE idCliente = ? AND idInscripcion = ? `,
        [idCliente, idInscripcion]
    );
    return inscripcion;
}

const insertInscripcion =  async(datos, idCliente) =>{
    await pool.query(
        `INSERT INTO inscripciones
        (idProfesor, idCliente, idPase, diaInicio, diaFin, precio, estado)
        VALUES (?, ?, ?, ?, ?, ?, 'A')`,
        [datos.idProfesor,
        idCliente,
        datos.idPase,
        datos.diaInicio,
        datos.diaFin,
        datos.precio   
        ]
    );
    return;
}

const updateInscripcionById = async(datos, idInscripcion, idCliente) =>{
    await pool.query(
        `UPDATE inscripciones
        SET
            idProfesor = ?,
            idCliente = ?,
            idPase = ?,
            diaInicio = ?,
            diaFin = ?,
            precio = ?,
            estado = ?
        WHERE idInscripcion = ?`,
        [datos.idProfesor,
        idCliente,
        datos.idPase,
        datos.diaInicio,
        datos.diaFin,
        datos.precio,
        datos.estado,
        idInscripcion] 
    );
    return;
}

const updateAltaInscripcionById = async(id) =>{
    await pool.query(
        `UPDATE inscripciones
        SET estado = 'A'
        WHERE idInscripcion = ?`,
        [id]
    );
    return;
}

const updateBajaInscripcionById = async(id) =>{
    await pool.query(
        `UPDATE inscripciones
        SET estado = 'B'
        WHERE idInscripcion = ?`,
        [id]
    );
    return;
}

const deleteInscripcionById = async(id) =>{
    await pool.query(
        `DELETE
        FROM inscripciones
        WHERE idInscripcion = ?`,
        [id]
    );
    return;
}

module.exports = {
    findAllInscripciones ,
    findInscripcionById,
    findInscripcionesByIdCliente,
    findAltaInscripcionesByIdCliente,
    findInscripcionByIdByIdCliente,
    insertInscripcion,
    updateInscripcionById,
    updateAltaInscripcionById, updateBajaInscripcionById,
    deleteInscripcionById
}