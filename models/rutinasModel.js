const pool = require('../config/db.js');

const findAllRutinas = async() =>{
    const [rutinas] = await pool.query(
        `SELECT idRutina, idCliente, nombre, observaciones, estado
        FROM rutinas`
    );
    return rutinas;
}

const findAllRutinasByIdCliente = async(idCliente) =>{
    const [rutinas] = await pool.query(
        `SELECT idRutina, nombre, observaciones, estado
        FROM rutinas
        WHERE idCliente = ?`,
        [idCliente]
    );
    return rutinas;
}

const findAltaRutinasByIdCliente = async(idCliente) =>{
    const [rutinas] = await pool.query(
        `SELECT idRutina, nombre, observaciones, estado
        FROM rutinas
        WHERE idCliente = ? AND estado = 'A'`,
        [idCliente]
    );
    return rutinas;
}

const findRutinaById = async(idRutina) =>{
    const [rutina] = await pool.query(
        `SELECT idCliente, nombre, observaciones, estado
        FROM rutinas
        WHERE idRutina = ?`,
        [idRutina]
    );
    return rutina;
}

const findRutinaByIdByIdCliente = async(idCliente, idRutina) =>{
    const [rutina] = await pool.query(
        `SELECT nombre, observaciones, estado
        FROM rutinas
        WHERE idCliente = ? AND idRutina = ?`,
        [idCliente, idRutina]
    );
    return rutina;
}

const findRutinaByNombre = async(nombre) =>{
    const [rutina] = await pool.query(
        `SELECT idRutina,idCliente, observaciones, estado
        FROM rutinas
        WHERE nombre = ?`,
        [nombre]
    );
    return rutina;
}

const insertRutina = async(datos, idCliente) =>{
    await pool.query(
        `INSERT INTO rutinas
        (idCliente, nombre, observaciones, estado)
        VALUES (?, ?, ?, 'A')`,
        [idCliente, 
        datos.nombre,
        datos.observaciones,
        datos.estado]
    );
    return;
}

const updateRutinaById = async(datos, idRutina, idCliente) =>{
    await pool.query(
        `UPDATE rutinas
        SET
            idCliente = ?,
            nombre = ?,
            observaciones = ?,
            estado = ?
        WHERE idRutina = ?`,
        [idCliente, 
        datos.nombre, 
        datos.observaciones, 
        datos.estado, 
        idRutina]
    );
    return;
}

const updateAltaRutinaById = async(idRutina) =>{
    await pool.query(
        `UPDATE rutinas
        SET estado = 'A'
        WHERE idRutina = ?`,
        [idRutina]
    );
    return;
}

const updateBajaRutinaById = async(idRutina) =>{
    await pool.query(
        `UPDATE rutinas
        SET estado = 'B'
        WHERE idRutina = ?`,
        [idRutina]
    );
    return;
}

const deleteRutinaById = async(idRutina) =>{
    await pool.query(
        `DELETE
        FROM rutinas
        WHERE idRutina = ?`,
        [idRutina]
    );
    return;
}

module.exports = {
    findAllRutinas,
    findAllRutinasByIdCliente,
    findAltaRutinasByIdCliente,
    findRutinaById,
    findRutinaByIdByIdCliente,
    insertRutina,
    findRutinaByNombre,
    updateRutinaById,
    updateAltaRutinaById, updateBajaRutinaById,
    deleteRutinaById
};