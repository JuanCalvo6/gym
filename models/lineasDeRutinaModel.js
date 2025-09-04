const pool =  require('../config/db.js');

const findAllLineasDeRutina = async() =>{
    const [lineasDeRutina] = await pool.query(
        `SELECT idLineaDeRutina,idCliente, idEjercicio, idRutina, repeticiones, series, descanso
        FROM lineasDeRutina`
    );
    return lineasDeRutina;
}

const findLineasDeRutinaByIdRutina = async(idRutina) =>{
    const [lineasDeRutina] = await pool.query(
        `SELECT idLineaDeRutina,idCliente, ejercicios.idEjercicio, ejercicios.nombre, repeticiones, series, descanso
        FROM lineasDeRutina
        JOIN ejercicios ON lineasDeRutina.idEjercicio = ejercicios.idEjercicio
        WHERE idRutina = ?`,
        [idRutina]
    );
    return lineasDeRutina;
}

const findLineasDeRutinaByIdEjercicioByIdRutina = async(idRutina, idEjercicio) =>{
    const [lineasDeRutina] = await pool.query(
        `SELECT idLineaDeRutina
        FROM lineasDeRutina
        WHERE idRutina = ? AND idEjercicio =  ?`,
        [idRutina, idEjercicio]
    );
    return lineasDeRutina;
}

const findLineaDeRutinaById = async(idLinea) =>{
    const [lineaDeRutina] = await pool.query(
        `SELECT idRutina, idCliente, idEjercicio, repeticiones, series, descanso
        FROM lineasDeRutina
        WHERE idLineaDeRutina = ?`,
        [idLinea]
    );
    return lineaDeRutina;
}

const findLineaDeRutinaByIdByIdRutina = async(idRutina, idLinea) =>{
    const [lineaDeRutina] = await pool.query(
        `SELECT idCliente, idEjercicio, repeticiones, series, descanso
        FROM lineasDeRutina
        WHERE idRutina = ? AND idLineaDeRutina = ?`,
        [idRutina, idLinea]
    );
    return lineaDeRutina;
}

const insertLineaDeRutina = async(datos, idRutina, idCliente) =>{
    await pool.query(
        `INSERT INTO lineasDeRutina
        (idEjercicio, idRutina, idCliente, repeticiones, series, descanso )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [datos.idEjercicio,
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
        SET idEjercicio = ?,
            idRutina = ?,
            idCliente = ?,
            repeticiones = ?,
            series = ?,
            descanso = ?
        WHERE idLineaDeRutina = ?`,
        [datos.idEjercicio,
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
    findLineasDeRutinaByIdEjercicioByIdRutina,
    findLineaDeRutinaById,
    findLineaDeRutinaByIdByIdRutina,
    insertLineaDeRutina,
    updateLineaDeRutinaById,
    deleteLineaDeRutinaById
};