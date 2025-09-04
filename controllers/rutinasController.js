const { findClienetById } = require('../models/clientesModel.js');
const { findAllRutinas,
        findAllRutinasByIdCliente,
        findAltaRutinasByIdCliente,
        findRutinaById,
        findRutinaByIdByIdCliente,
        insertRutina,
        findRutinaByNombre,
        updateRutinaById,
        updateAltaRutinaById, updateBajaRutinaById,
        deleteRutinaById} = require('../models/rutinasModel.js');
const listarRutinas = async(req, res) =>{
    try {
        const rutinas = await findAllRutinas();

        if(rutinas.length === 0) return res.status(400).json({message: "No existen rutinas"});
        return res.send(rutinas);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const listarRutinasCliente = async(req, res) =>{
    const idCliente = parseInt(req.params.id, 10);
    const {bajas} = req.query;
    const incluirBajas = bajas === 'true';

    try {
        const cliente = await findClienetById(idCliente);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        
        if(incluirBajas){
            const rutinas = await findAllRutinasByIdCliente(idCliente);
            if(rutinas.length === 0) return res.status(400).json({message: "El cliente no tiene rutinas"});
            return res.send(rutinas);
        }else{
            const rutinas =  await findAltaRutinasByIdCliente(idCliente);
            if(rutinas.length === 0) return res.status(400).json({message: "El cliente no tiene rutinas de Alta"});
            return res.send(rutinas);
        }
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerRutina = async(req, res) =>{
    const idRutina = parseInt(req.params.id, 10);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        return res.send(rutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerRutinaCliente = async(req, res) =>{
    const idCliente = parseInt(req.params.id, 10);
    const idRutina = parseInt(req.params.idRutina, 10);

    try {
        const cliente = await findClienetById(idCliente);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const rutina = await findRutinaByIdByIdCliente(idCliente, idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "El cliente no tiene una rutina con ese ID"});
        return res.send(rutina);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const crearRutinaCliente = async(req, res) =>{
    const idCliente = parseInt(req.params.id, 10);
    const {nombre} = req.body;

    try {
        const cliente = await findClienetById(idCliente);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const isMatch = await findRutinaByNombre(nombre, idCliente);

        if(cliente[0].estado === 'B') return res.status(400).json({message: "El cliente debe estar de Alta"})

        if(isMatch.length > 0) return res.status(400).json({message: "Ya existe una rutina con ese nombre"});
        await insertRutina(req.body, idCliente);
        return res.status(200).json({message: "Rutina creada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const modificarRutina = async(req, res) =>{
    const idRutina = parseInt(req.params.id, 10);
    const {nombre} = req.body;
    console.log(nombre);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        const isMatch = await findRutinaByNombre(nombre);

        if(isMatch > 0){
            const conflicto = isMatch.some(match => match.idRutina !== idRutina)
            if(conflicto) return res.status(400).json({message: "Ya existe una rutina con ese nombre"});
        }
        await updateRutinaById(req.body, idRutina, rutina[0].idCliente);
        return res.status(200).json({message: "Rutina modificada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error});
    }
}

const darAltaRutina = async(req, res) =>{
    const idRutina = parseInt(req.params.id, 10);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        if(rutina[0].estado === 'A') return res.status(400).json({message: "La rutina ya esta dada de Alta"});
        await updateAltaRutinaById(idRutina);
        return res.status(200).json({message: "Rutina dada de Alta con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaRutina = async(req, res) =>{
    const idRutina = parseInt(req.params.id, 10);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        if(rutina[0].estado === 'B') return res.status(400).json({message: "La rutina ya esta dada de Baja"});
        await updateBajaRutinaById(idRutina);
        return res.status(200).json({message: "Rutina dada de Baja con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarRutina = async(req, res) =>{
    const idRutina = parseInt(req.params.id, 10);

    try {
        const rutina = await findRutinaById(idRutina);

        if(rutina.length === 0) return res.status(400).json({message: "No existe una rutina con ese ID"});
        await deleteRutinaById(idRutina);
        return res.status(200).json({message: "Rutina eliminada con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarRutinas,
    listarRutinasCliente,
    obtenerRutina,
    obtenerRutinaCliente,
    crearRutinaCliente,
    modificarRutina,
    darAltaRutina,
    darBajaRutina,
    eliminarRutina
}