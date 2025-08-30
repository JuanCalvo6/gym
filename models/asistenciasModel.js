const pool = require('../config/db.js');

const findAllAsistencias = async() =>{
    const [asistencias] = await pool.query(
        `SELECT idAsistencia, idCliente, fecha
        FROM asistencias
        ORDER BY idCliente`
    );
    return asistencias;
}

const findAsistenciaById = async(id) =>{
    const [asistencia] = await pool.query(
        `SELECT idAsistencia, idCliente, fecha
        FROM asistencias
        WHERE idAsistencia = ?`,
        [id]
    );
    return asistencia;
}

const findAllAsistenciasByIdCliente = async(id) =>{
    const [asistencias] = await pool.query(
        `SELECT idAsistencia, fecha
        FROM asistencias
        WHERE idCliente = ?`,
        [id]
    );
    return asistencias;
}

const findAsistenciaByIdByIdCliente = async(id, idAsistencia) =>{
    const [asistencia] = await pool.query(
        `SELECT idAsistencia, fecha
        FROM asistencias
        WHERE idCliente = ? AND idAsistencia = ?`,
        [id, idAsistencia]
    );
    return asistencia;
}

const insertAsistenciaByIdCliente = async(datos, id) =>{
    await pool.query(
        `INSERT INTO asistencias
        (idCliente, fecha)
        VALUES (?, ?)`,
        [id, datos.fecha]
    );
    return;
}

const deleteAsistenciaById = async(id) =>{
    await pool.query(
    `DELETE
    FROM asistencias
    WHERE idAsistencia = ?`,
    [id]
    );
    return;
}

module.exports = {
    findAllAsistencias,
    findAsistenciaById,
    deleteAsistenciaById,
    findAllAsistenciasByIdCliente,
    findAsistenciaByIdByIdCliente,
    insertAsistenciaByIdCliente
}