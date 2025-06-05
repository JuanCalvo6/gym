const pool = require('../config/db.js');

const getInscripciones = async() =>{
    const [inscripciones] = await pool.query(
        `SELECT idInscripcion, idProfesor, idCliente, idPase, date_format(diaInicio, '%d-%m-%Y') AS inicio ,date_format(diaFin, '%d-%m-%Y') AS fin, precio, estado
        FROM inscripciones`
    );
    return inscripciones;
}

const getInscripcionById = async(id) =>{
    const [inscripcion] = await pool.query(
        `SELECT idProfesor, idCliente, idPase, date_format(diaInicio, '%d-%m-%Y') AS inicio ,date_format(diaFin, '%d-%m-%Y') AS fin, precio, estado
        FROM inscripciones
        WHERE idInscripcion = ?`,
        [id]
    );
    return inscripcion;
}

const getInscripcionesByCliente = async(id) =>{
    const [inscripciones] = await pool.query(
        `SELECT idInscripcion, idProfesor, idPase, date_format(diaInicio, '%d-%m-%Y') AS inicio ,date_format(diaFin, '%d-%m-%Y') AS fin, precio, estado
        FROM inscripciones
        WHERE idCliente = ?`,
        [id]
    );
    return inscripciones;
}

const getInscripcionByCliente = async(idCliente, idInscripcion) =>{
    const [inscripcion] = await pool.query(
        `SELECT idProfesor, idPase, date_format(diaInicio, '%d-%m-%Y') AS inicio ,date_format(diaFin, '%d-%m-%Y') AS fin, precio, estado
        FROM inscripciones
        WHERE idCliente = ? AND idInscripcion = ? `,
        [idCliente, idInscripcion]
    );
    return inscripcion;
}

const crearInscripcion =  async(datos, idCliente) =>{
    await pool.query(
        `INSERT INTO inscripciones
        (idProfesor, idCliente, idPase, date_format(diaInicio, '%d-%m-%Y') AS inicio ,date_format(diaFin, '%d-%m-%Y') AS fin, precio, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [datos.idProfesor,
        idCliente,
        datos.idPase,
        datos.diaInicio,
        datos.diaFin,
        datos.precio,
        datos.estado    
        ]
    );
    return;
}

const updateInscripcion = async(datos, idInscripcion, idCliente) =>{
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

const darAlta = async(id) =>{
    await pool.query(
        `UPDATE inscripciones
        SET estado = 'A'
        WHERE idInscripcion = ?`,
        [id]
    );
    return;
}

const darBaja = async(id) =>{
    await pool.query(
        `UPDATE inscripciones
        SET estado = 'B'
        WHERE idInscripcion = ?`,
        [id]
    );
    return;
}

const deleteInscripcion = async(id) =>{
    await pool.query(
        `DELETE
        FROM inscripciones
        WHERE idInscripcion = ?`,
        [id]
    );
    return;
}

module.exports = {
    getInscripciones,
    getInscripcionById,
    getInscripcionesByCliente,
    getInscripcionByCliente,
    crearInscripcion,
    updateInscripcion,
    darAlta, darBaja,
    deleteInscripcion
}