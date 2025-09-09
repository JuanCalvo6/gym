const pool =  require('../config/db.js');

const findAllLineasDeRutina = async() =>{
    const [lineasDeRutina] = await pool.query(
        `SELECT idLineaDeRutina, ejercicio, idCliente, idRutina, repeticiones, series, descanso
        FROM lineasDeRutina`
    );
    return lineasDeRutina;
}

const findLineasDeRutinaByIdRutina = async(idRutina) =>{
    const [lineasDeRutina] = await pool.query(
        `SELECT  idLineaDeRutina, ejercicio, idCliente, repeticiones, series, descanso
        FROM lineasDeRutina
        WHERE idRutina = ?`,
        [idRutina]
    );
    return lineasDeRutina;
}

const findLineaDeRutinaById = async(idLinea) =>{
    const [lineaDeRutina] = await pool.query(
        `SELECT idRutina, ejercicio, idCliente, repeticiones, series, descanso
        FROM lineasDeRutina
        WHERE idLineaDeRutina = ?`,
        [idLinea]
    );
    return lineaDeRutina;
}

const findLineaDeRutinaByIdByIdRutina = async(idRutina, idLinea) =>{
    const [lineaDeRutina] = await pool.query(
        `SELECT ejercicio, idCliente, repeticiones, series, descanso
        FROM lineasDeRutina
        WHERE idRutina = ? AND idLineaDeRutina = ?`,
        [idRutina, idLinea]
    );
    return lineaDeRutina;
}

const insertLineaDeRutina = async(datos, idRutina, idCliente) =>{
    await pool.query(
        `INSERT INTO lineasDeRutina
        (ejercicio, idRutina, idCliente, repeticiones, series, descanso )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [datos.ejercicio,
        idRutina,
        idCliente,
        datos.repeticiones,
        datos.series,
        datos.descanso
        ]
    );
    return;
}

const updateLineaDeRutinaById = async(datos, idLinea, idRutina, idCliente) =>{
    await pool.query(
        `UPDATE lineasDeRutina
        SET ejercicio = ?,
            idRutina = ?,
            idCliente = ?,
            repeticiones = ?,
            series = ?,
            descanso = ?
        WHERE idLineaDeRutina = ?`,
        [datos.ejercicio,
        idRutina,
        idCliente,
        datos.repeticiones,
        datos.series,
        datos.descanso,
        idLinea]
    );
    return;
}

const deleteLineaDeRutinaById = async(idLinea) =>{
    await pool.query(
        `DELETE
        FROM lineasDeRutina
        WHERE idLineaDeRutina = ?`,
        [idLinea]
    ); 
    return;
}

module.exports = {
    findAllLineasDeRutina,
    findLineasDeRutinaByIdRutina,
    findLineaDeRutinaById,
    findLineaDeRutinaByIdByIdRutina,
    insertLineaDeRutina,
    updateLineaDeRutinaById,
    deleteLineaDeRutinaById
};