const pool = require('../config/db.js');

const findAllPases = async() =>{
    const [pases] = await pool.query(
        `SELECT idPase, nombre, horaInicio, horaFin, precio, estado
        FROM pases`
    );
    return pases;
}

const findPaseById = async(id) =>{
    const [pase] = await pool.query(
        `SELECT nombre, horaInicio, horaFin, precio, estado
        FROM pases
        WHERE idPase = ?`,
        [id]
    );
    return pase;
}

const findPaseByNombre = async(nombre) =>{
    const [pase] = await pool.query(
        `SELECT idPase,nombre, horaInicio, horaFin, precio, estado
        FROM pases
        WHERE nombre = ?`,
        [nombre]
    );
    return pase;
}

const insertPase = async(datos) => {
    await pool.query(
        `INSERT INTO pases
        (nombre, horaInicio, horaFin, precio, estado)
        VALUES (?, ?, ?, ?, 'A')`,
        [datos.nombre,
        datos.horaInicio,
        datos.horaFin,
        datos.precio]
    );
    return;
}

const updatePaseById = async(datos, id) =>{
    await pool.query(
        `UPDATE pases
        SET
            nombre = ?,
            horaInicio = ?,
            horaFIn = ?,
            precio = ?
        WHERE idPase = ? `,
        [datos.nombre,
        datos.horaInicio,
        datos.horaFin,
        datos.precio,
        id]
    );
    return;
}

const updateAltaPaseById = async(id) =>{
    await pool.query(
        `UPDATE pases
        SET estado = 'A'
        WHERE idPase = ?`,
        [id]
    );
    return;
}

const updateBajaPaseById = async(id) =>{
    await pool.query(
        `UPDATE pases
        SET estado = 'B'
        WHERE idPase = ?`,
        [id]
    );
    return;
}

const deletePaseById = async(id) =>{
    await pool.query(
        `DELETE
        FROM pases
        WHERE idPase = ?`,
        [id]
    );
    return;
}

module.exports = {
    findAllPases,
    findPaseById,
    findPaseByNombre,
    insertPase,
    updatePaseById, 
    updateAltaPaseById,
    updateBajaPaseById,
    deletePaseById
};