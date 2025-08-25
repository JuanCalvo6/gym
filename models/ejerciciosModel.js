const pool = require('../config/db.js');

const getEjercicios = async()=>{
    const [ejercicios] = await pool.query(
        `SELECT  idEjercicio, nombre, estado
        FROM ejercicios
        ORDER BY nombre`
    );

    return ejercicios;
}

const getEjercicioById = async(id) =>{
    const [ejercicio] = await pool.query(
        `SELECT nombre, estado
        FROM ejercicios
        WHERE idEjercicio = ?`,
        [id]
    );
    return ejercicio;
}

const getEjercicioByNombre = async(nombre) =>{
    const [ejercicio] =  await pool.query(
        `SELECT nombre, estado
        FROM ejercicios
        WHERE nombre = ?`,
        [nombre]
    );
    return ejercicio;
}

const nuevoEjercicio = async(nombre) =>{
    await pool.query(
        `INSERT INTO ejercicios
        (nombre, estado)
        VALUES(?, 'A')`,
        [nombre]
    );
    return;
}

const updateEjercicio = async(ejercicio, id) =>{
    await pool.query(
        `UPDATE ejercicios 
         SET nombre =  ?
         WHERE idEjercicio = ?`,
         [ejercicio.nombre, id]
    );
    return;
}

const darBaja = async(id) =>{
    await pool.query(
        `UPDATE ejercicios
        SET estado = 'B'
        WHERE idEjercicio = ?`,
        [id]
    );
    return;
}

const darAlta = async(id) =>{
    await pool.query(
        `UPDATE ejercicios
        SET estado = 'A'
        WHERE idEjercicio = ?`,
        [id]
    );
    return;
}

const eliminarEjercicio = async(id) =>{
    await pool.query(
        `DELETE 
        FROM ejercicios
        WHERE idEjercicio = ?`,
        [id]
    );
    return;
}

module.exports = {
    getEjercicios,
    getEjercicioById,
    getEjercicioByNombre,
    nuevoEjercicio,
    updateEjercicio,
    darBaja,
    darAlta,
    eliminarEjercicio
}