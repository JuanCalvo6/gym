const pool = require('../config/db.js');

const getRutinas = async() =>{
    const [rutinas] = await pool.query(
        `SELECT idRutina, idCliente, nombre, observaciones, estado
        FROM rutinas`
    );
    return rutinas;
}

const getRutinasByCliente = async(idCliente) =>{
    const [rutinas] = await pool.query(
        `SELECT idRutina, nombre, observaciones, estado
        FROM rutinas
        WHERE idCliente = ?`,
        [idCliente]
    );
    return rutinas;
}

const getRutinasAltaByCliente = async(idCliente) =>{
    const [rutinas] = await pool.query(
        `SELECT idRutina, nombre, observaciones, estado
        FROM rutinas
        WHERE idCliente = ? AND estado = 'A'`,
        [idCliente]
    );
    return rutinas;
}

const getRutinaById = async(idRutina) =>{
    const [rutina] = await pool.query(
        `SELECT idCliente, nombre, observaciones, estado
        FROM rutinas
        WHERE idRutina = ?`,
        [idRutina]
    );
    return rutina;
}

const getRutinaByCliente = async(idCliente, idRutina) =>{
    const [rutina] = await pool.query(
        `SELECT nombre, observaciones, estado
        FROM rutinas
        WHERE idCliente = ? AND idRutina = ?`,
        [idCliente, idRutina]
    );
    return rutina;
}

const getRutinaByNombre = async(nombre) =>{
    const [rutina] = await pool.query(
        `SELECT idRutina,idCliente, observaciones, estado
        FROM rutinas
        WHERE nombre = ?`,
        [nombre]
    );
    return rutina;
}

const nuevaRutina = async(datos, idCliente) =>{
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

const updateRutina = async(datos, idRutina, idCliente) =>{
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

const darAlta = async(idRutina) =>{
    await pool.query(
        `UPDATE rutinas
        SET estado = 'A'
        WHERE idRutina = ?`,
        [idRutina]
    );
    return;
}

const darBaja = async(idRutina) =>{
    await pool.query(
        `UPDATE rutinas
        SET estado = 'B'
        WHERE idRutina = ?`,
        [idRutina]
    );
    return;
}

const deleteRutina = async(idRutina) =>{
    await pool.query(
        `DELETE
        FROM rutinas
        WHERE idRutina = ?`,
        [idRutina]
    );
    return;
}

module.exports = {
    getRutinas,
    getRutinasByCliente,
    getRutinasAltaByCliente,
    getRutinaById,
    getRutinaByCliente,
    nuevaRutina,
    getRutinaByNombre,
    updateRutina,
    darAlta, darBaja,
    deleteRutina
};