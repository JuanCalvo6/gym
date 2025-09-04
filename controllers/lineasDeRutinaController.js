const { findClienetById } = require('../models/clientesModel.js');
const {findEjercicioById} = require('../models/ejerciciosModel.js');
const { findAllLineasDeRutina,
        findLineasDeRutinaByIdRutina,
        findLineasDeRutinaByIdEjercicioByIdRutina,
        findLineaDeRutinaById,
        findLineaDeRutinaByIdByIdRutina,
        insertLineaDeRutina,
        updateLineaDeRutinaById,
        deleteLineaDeRutinaById} = require('../models/lineasDeRutinaModel.js');
const { findRutinaById } = require('../models/rutinasModel.js');

const listarLineasDeRutina = async(req, res)=>{
    try {
        const lineasDeRutina = await findAllLineasDeRutina();

        if(lineasDeRutina.length === 0) return res.status(400).json({message: "No hay lineas de Rutina"});
        return res.send(lineasDeRutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const listarLineasDeRutinaRutina = async(req, res)=>{
    const idRutina = parseInt(req.params.id, 10);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const lineasDeRutina = await findLineasDeRutinaByIdRutina(idRutina);

        if(lineasDeRutina.length === 0) return res.status(400).json({message: "La rutina no tiene lineas de Rutina"});
        return res.send(lineasDeRutina);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerLineaDeRutinaRutina = async(req, res)=>{
    const idLinea = parseInt(req.params.id, 10);

    try {
        const lineaDeRutina = await findLineaDeRutinaById(idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "No existe una linea de rutina con ese ID"});
        return res.send(lineaDeRutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerLineaDeRutinaRutinaDeRutina = async(req, res)=>{
    const idRutina = parseInt(req.params.id, 10);
    const idLinea = parseInt(req.params.idLinea, 10);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const lineaDeRutina = await findLineaDeRutinaByIdByIdRutina(idRutina, idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "La rutina no tiene una linea con ese ID"});
        return res.send(lineaDeRutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const nuevaLineaDeRutinaRutina = async(req, res)=>{
    const idRutina = parseInt(req.params.id, 10);
    const {idEjercicio} = req.body;

    try {
        const rutina = await findRutinaById(idRutina);
        
        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const ejercicio = await findEjercicioById(idEjercicio);

        if(ejercicio.length === 0) return res.status(400).json({message: "No existe un ejercicio con ese ID"});
        const isMatchEjercicio = await findLineasDeRutinaByIdEjercicioByIdRutina(idRutina, idEjercicio);

        if(isMatchEjercicio.length > 0) return res.status(400).json({message: "Ya se encuentra ese ejercicio en la rutina"});

        await insertLineaDeRutina(req.body, idRutina, rutina[0].idCliente);
        return res.status(200).json({message: "Linea de rutina creada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const modificarLineaDeRutina = async(req, res)=>{
    const idLinea = parseInt(req.params.id, 10);
    const {idEjercicio} = req.body;

    try {
        const lineaDeRutina = await findLineaDeRutinaById(idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "No existe una linea de rutina con ese ID"});
        const ejercicio = await findEjercicioById(idEjercicio);

        if(ejercicio.length === 0) return res.status(400).json({message: "No existe un ejercicio con ese ID"});
        await updateLineaDeRutinaById(req.body, idLinea, lineaDeRutina[0].idRutina, lineaDeRutina[0].idCliente);

        return res.status(200).json({message: "Linea de rutina modificada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarLineaDeRutina = async(req, res)=>{
    const idLinea = parseInt(req.params.id, 10);

    try {
        const lineaDeRutina = await findLineaDeRutinaById(idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "No existe una linea de rutina con ese ID"});
        await deleteLineaDeRutinaById(idLinea);
        return res.status(200).json({message: "Linea de rutina eliminada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarLineasDeRutina,
    listarLineasDeRutinaRutina,
    obtenerLineaDeRutinaRutina,
    obtenerLineaDeRutinaRutinaDeRutina,
    nuevaLineaDeRutinaRutina,
    modificarLineaDeRutina,
    eliminarLineaDeRutina
}
