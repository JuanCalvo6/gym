const { getEjercicios,
        getEjercicioById,
        getEjercicioByNombre,
        nuevoEjercicio,
        darBaja,
        darAlta,
        eliminarEjercicio} = require('../models/ejerciciosModel.js');

const listarEjercicios = async(req, res) =>{
    try {
        const ejercicios = await getEjercicios();

        if(ejercicios.length === 0) return res.status(400).json({message: "No hay ejercicios"});
        return res.send(ejercicios);

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const obtenerEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const ejercicio = await getEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});
        return res.send(ejercicio);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const newEjercicio = async(req, res) =>{
    const {nombre} =  req.body;

    try {
        const ejercicio = await getEjercicioByNombre(nombre);

        if(ejercicio.length > 0) return res.status(400).json({message: "Ya existe un ejercicio con ese nombre."});
        await nuevoEjercicio(nombre);
        return res.status(200).json({message: "Ejercicio creado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id);

    try {
        const ejercicio = await getEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});

        if(ejercicio[0].estado === 'B') return res.status(400).json({message: "El ejercicios ya se encuentra dado de Baja"})
        await darBaja(id);
        return res.status(201).json({message: "Ejercicio dado de Baja con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
    
}

const darAltaEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id);

    try {
        const ejercicio = await getEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicio con ese ID"});

        if(ejercicio[0].estado === 'A') return res.status(400).json({message: "El ejercicios ya se encuentra dado de Alta"})
        await darAlta(id);
        return res.status(201).json({message: "Ejercicio dado de Alta con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const deleteEjercicio = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const ejercicio = await getEjercicioById(id);

        if(ejercicio.length === 0) return res.status(400).json({message: "No hay un ejercicios con ese ID"});
        await eliminarEjercicio(id);
        return res.status(201).json({message: "Ejercicio eliminado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarEjercicios,
    obtenerEjercicio,
    newEjercicio,
    darBajaEjercicio,
    darAltaEjercicio,
    deleteEjercicio
}