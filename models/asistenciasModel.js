const pool = require('../config/db.js');

const getAsistencias = async() =>{
    const [asistencias] = await pool.query(
        `SELECT idAsistencia, idCliente, date_format(fecha, '%H:%i %d-%m-%Y') AS Asistencia
        FROM asistencias
        ORDER BY idCliente`
    );
    return asistencias;
}

const getAsistenciaById = async(id) =>{
    const [asistencia] = await pool.query(
        `SELECT idAsistencia, idCliente, date_format(fecha, '%H:%i %d-%m-%Y') AS Asistencia
        FROM asistencias
        WHERE idAsistencia = ?`,
        [id]
    );
    return asistencia;
}

const getAsistenciasByCliente = async(id) =>{
    const [asistencias] = await pool.query(
        `SELECT idAsistencia, date_format(fecha, '%H:%i %d-%m-%Y') AS Asistencia
        FROM asistencias
        WHERE idCliente = ?`,
        [id]
    );
    return asistencias;
}

const getAsistenciaByCliente = async(id, idAsistencia) =>{
    const [asistencia] = await pool.query(
        `SELECT idAsistencia, date_format(fecha, '%H:%i %d-%m-%Y') AS Asistencia
        FROM asistencias
        WHERE idCliente = ? AND idAsistencia = ?`,
        [id, idAsistencia]
    );
    return asistencia;
}

const crearAsistenciaCliente = async(datos, id) =>{
    await pool.query(
        `INSERT INTO asistencias
        (idCliente, fecha)
        VALUES (?, ?)`,
        [id, datos.fecha]
    );
    return;
}

const deleteAsistencia = async(id) =>{
    await pool.query(
    `DELETE
    FROM asistencias
    WHERE idAsistencia = ?`,
    [id]
    );
    return;
}

module.exports = {
    getAsistencias,
    getAsistenciaById,
    deleteAsistencia,
    getAsistenciasByCliente,
    getAsistenciaByCliente,
    crearAsistenciaCliente
}