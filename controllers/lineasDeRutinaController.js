const { getClienteById } = require('../models/clientesModel.js');
const {getEjercicioById} = require('../models/ejerciciosModel.js');
const { getLineas,
        getlineasDeRutina,
        getLineaById,
        getLineaDeRutina,
        newLineaDeRutina,
        updateLinaDeRutina,
        deleteLineaDeRutina} = require('../models/lineasDeRutinaModel.js');
const { getRutinaById } = require('../models/rutinasModel.js');

const listarLineas = async(req, res)=>{
    try {
        const lineasDeRutina = await getLineas();

        if(lineasDeRutina.length === 0) return res.status(400).json({message: "No hay lineas de Rutina"});
        return res.send(lineasDeRutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const listarLineasDeRutina = async(req, res)=>{
    const idRutina = parseInt(req.params.id, 10);

    try {
        const rutina = await getRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const lineasDeRutina = await getlineasDeRutina(idRutina);

        if(lineasDeRutina.length === 0) return res.status(400).json({message: "La rutina no tiene lineas de Rutina"});
        return res.send(lineasDeRutina);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerLinea = async(req, res)=>{
    const idLinea = parseInt(req.params.id, 10);

    try {
        const lineaDeRutina = await getLineaById(idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "No existe una linea de rutina con ese ID"});
        return res.send(lineaDeRutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerLineaDeRutina = async(req, res)=>{
    const idRutina = parseInt(req.params.id, 10);
    const idLinea = parseInt(req.params.idLinea, 10);

    try {
        const rutina = await getRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const lineaDeRutina = await getLineaDeRutina(idRutina, idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "La rutina no tiene una linea con ese ID"});
        return res.send(lineaDeRutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const nuevaLineaDeRutina = async(req, res)=>{
    const idRutina = parseInt(req.params.id, 10);
    const {idEjercicio} = req.body;

    try {
        const rutina = await getRutinaById(idRutina);
        
        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const ejercicio = await getEjercicioById(idEjercicio);

        if(ejercicio.length === 0) return res.status(400).json({message: "No existe un ejercicio con ese ID"});
        await newLineaDeRutina(req.body, idRutina, rutina[0].idCliente);
        return res.status(200).json({message: "Linea de rutina creada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const modificarLineaDeRutina = async(req, res)=>{
    const idLinea = parseInt(req.params.id, 10);
    const {idEjercicio} = req.body;

    try {
        const lineaDeRutina = await getLineaById(idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "No existe una linea de rutina con ese ID"});
        const ejercicio = await getEjercicioById(idEjercicio);

        if(ejercicio.length === 0) return res.status(400).json({message: "No existe un ejercicio con ese ID"});
        await updateLinaDeRutina(req.body, idLinea, lineaDeRutina[0].idRutina, lineaDeRutina[0].idCliente);

        return res.status(200).json({message: "Linea de rutina modificada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarLineasDeRutina = async(req, res)=>{
    const idLinea = parseInt(req.params.id, 10);

    try {
        const lineaDeRutina = await getLineaById(idLinea);

        if(lineaDeRutina.length === 0) return res.status(400).json({message: "No existe una linea de rutina con ese ID"});
        await deleteLineaDeRutina(idLinea);
        return res.status(200).json({message: "Linea de rutina eliminada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarLineas,
    listarLineasDeRutina,
    obtenerLinea,
    obtenerLineaDeRutina,
    nuevaLineaDeRutina,
    modificarLineaDeRutina,
    eliminarLineasDeRutina
}
