const { findAllEjercicios,
        findEjercicioById,
        findEjercicioByNombre,
        insertEjercicio,
        updateEjercicioById,
        updateBajaEjercicioById,
        updateAltaEjercicioById,
        deleteEjercicioById} = require('../models/ejerciciosModel.js');

const listarEjercicios = async(req, res) =>{
    try {
        const ejercicios = await findAllEjercicios();

        if(ejercicios.length === 0) return res.status(400).json({message: "No hay ejercicios"});
        return res.send(ejercicios);

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const obtenerEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const ejercicio = await findEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});
        return res.send(ejercicio);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const nuevoEjercicio = async(req, res) =>{
    const {nombre} =  req.body;

    try {
        const ejercicio = await findEjercicioByNombre(nombre);

        if(ejercicio.length > 0) return res.status(400).json({message: "Ya existe un ejercicio con ese nombre."});
        await insertEjercicio(nombre);
        return res.status(200).json({message: "Ejercicio creado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const modificarEjercicio = async(req, res) =>{
    const {nombre} = req.body;
    const id = parseInt(req.params.id);

    try {
        const ejercicio = await findEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});
        const isMatchNombre = await findEjercicioByNombre(nombre);

        if(isMatchNombre.length > 0){
            const conflicto = isMatchNombre.some(match => match.idEjercicio !== id);
            if(conflicto) return res.status(409).json({message: "Ya existe un ejercicio con ese nombre"});
        }
        await updateEjercicioById(req.body, id);
        return res.status(200).json({message: "Ejercicio modificado con exito"})

    } catch (error) {
        return res.status(400).json({message: error.message});
    }

}

const darBajaEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id);

    try {
        const ejercicio = await findEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});

        if(ejercicio[0].estado === 'B') return res.status(400).json({message: "El ejercicios ya se encuentra dado de Baja"})
        await updateBajaEjercicioById(id);
        return res.status(201).json({message: "Ejercicio dado de Baja con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
    
}

const darAltaEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id);

    try {
        const ejercicio = await findEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});

        if(ejercicio[0].estado === 'A') return res.status(400).json({message: "El ejercicios ya se encuentra dado de Alta"})
        await updateAltaEjercicioById(id);
        return res.status(201).json({message: "Ejercicio dado de Alta con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const ejercicio = await findEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicios con ese ID"});
        await deleteEjercicioById(id);
        return res.status(201).json({message: "Ejercicio eliminado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarEjercicios,
    obtenerEjercicio,
    nuevoEjercicio,
    modificarEjercicio,
    darBajaEjercicio,
    darAltaEjercicio,
    eliminarEjercicio
}