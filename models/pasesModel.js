const pool = require('../config/db.js');

const getPases = async() =>{
    const [pases] = await pool.query(
        `SELECT idPase, nombre, horaInicio, horaFin, precio, estado
        FROM pases`
    );
    return pases;
}

const getPaseById = async(id) =>{
    const [pase] = await pool.query(
        `SELECT nombre, horaInicio, horaFin, precio, estado
        FROM pases
        WHERE idPase = ?`,
        [id]
    );
    return pase;
}

const getPaseByNombre = async(nombre) =>{
    const [pase] = await pool.query(
        `SELECT idPase,nombre, horaInicio, horaFin, precio, estado
        FROM pases
        WHERE nombre = ?`,
        [nombre]
    );
    return pase;
}

const crearPase = async(datos) => {
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

const modificarPase = async(datos, id) =>{
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

const darAlta = async(id) =>{
    await pool.query(
        `UPDATE pases
        SET estado = 'A'
        WHERE idPase = ?`,
        [id]
    );
    return;
}

const darBaja = async(id) =>{
    await pool.query(
        `UPDATE pases
        SET estado = 'B'
        WHERE idPase = ?`,
        [id]
    );
    return;
}

const eliminarPase = async(id) =>{
    await pool.query(
        `DELETE
        FROM pases
        WHERE idPase = ?`,
        [id]
    );
    return;
}

module.exports = {
    getPases,
    getPaseById,
    getPaseByNombre,
    crearPase,
    modificarPase, 
    darAlta,
    darBaja,
    eliminarPase
};