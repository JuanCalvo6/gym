const pool = require('../config/db.js');

const findAllEjercicios = async()=>{
    const [ejercicios] = await pool.query(
        `SELECT  idEjercicio, nombre, estado
        FROM ejercicios
        ORDER BY nombre`
    );

    return ejercicios;
}

const findAltaEjercicios = async()=>{
    const [ejercicios] = await pool.query(
        `SELECT  idEjercicio, nombre, estado
        FROM ejercicios
        WHERE estado = 'A'
        ORDER BY nombre`
    );

    return ejercicios;
}

const findEjercicioById = async(id) =>{
    const [ejercicio] = await pool.query(
        `SELECT nombre, estado
        FROM ejercicios
        WHERE idEjercicio = ?`,
        [id]
    );
    return ejercicio;
}

const findAltaEjercicioById = async(id) =>{
    const [ejercicio] = await pool.query(
        `SELECT nombre
        FROM ejercicios
        WHERE idEjercicio = ? AND estado = 'A'`,
        [id]
    );
    return ejercicio;
}

const findEjercicioByNombre = async(nombre) =>{
    const [ejercicio] =  await pool.query(
        `SELECT nombre, estado
        FROM ejercicios
        WHERE nombre = ?`,
        [nombre]
    );
    return ejercicio;
}

const insertEjercicio = async(nombre) =>{
    await pool.query(
        `INSERT INTO ejercicios
        (nombre, estado)
        VALUES(?, 'A')`,
        [nombre]
    );
    return;
}

const updateEjercicioById = async(ejercicio, id) =>{
    await pool.query(
        `UPDATE ejercicios 
         SET nombre =  ?
         WHERE idEjercicio = ?`,
         [ejercicio.nombre, id]
    );
    return;
}

const updateBajaEjercicioById = async(id) =>{
    await pool.query(
        `UPDATE ejercicios
        SET estado = 'B'
        WHERE idEjercicio = ?`,
        [id]
    );
    return;
}

const updateAltaEjercicioById = async(id) =>{
    await pool.query(
        `UPDATE ejercicios
        SET estado = 'A'
        WHERE idEjercicio = ?`,
        [id]
    );
    return;
}

const deleteEjercicioById = async(id) =>{
    await pool.query(
        `DELETE 
        FROM ejercicios
        WHERE idEjercicio = ?`,
        [id]
    );
    return;
}

module.exports = {
    findAllEjercicios,
    findAltaEjercicios,
    findEjercicioById,
    findAltaEjercicioById,
    findEjercicioByNombre,
    insertEjercicio,
    updateEjercicioById,
    updateBajaEjercicioById,
    updateAltaEjercicioById,
    deleteEjercicioById
}