const { getAsistencias,
        getAsistenciaById,
        deleteAsistencia,
        getAsistenciasByCliente,
        getAsistenciaByCliente,
        crearAsistenciaCliente
} = require('../models/asistenciasModel.js');
const { getClienteById } = require('../models/clientesModel.js');

const listarAsistencias = async(req, res) =>{
    try {
        const asistencias =  await getAsistencias();

        if(asistencias.length === 0) return res.status(400).json({message: "No hay asistencias"});
        return res.send(asistencias);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerAsistencia = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const asistencia = await getAsistenciaById(id);
        console.log(asistencia);
        if(asistencia.length === 0) return res.status(400).json({message: "No existe una asistencia con ese ID"});

        return res.send(asistencia);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const listarAsistenciasCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await getClienteById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const asistencias = await getAsistenciasByCliente(id);

        if(asistencias.length === 0) return res.status(400).json({message: "El cliente no tiene asistencias"});
        return res.send(asistencias);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerAsistenciaCliente = async(req,res) =>{
    const id = parseInt(req.params.id, 10);
    const idAsistencia = parseInt(req.params.idAsistencia, 10);

    try {
        const isMatch = await getClienteById(id);
        
        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const asistencia = await getAsistenciaByCliente(id, idAsistencia);
        
        if(asistencia.length === 0) return res.status(400).json({message: "El cliente no tiene una asistencia con ese ID"});
        return res.send(asistencia);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const newAsistenciaCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await getClienteById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});

        await crearAsistenciaCliente(req.body, id);
        return res.status(200).json({message: "Asistencia creada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarAsistencia = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await getAsistenciaById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe una asistencia con ese ID"});
        await deleteAsistencia(id);
        return res.status(200).json({message: "Asistencia eliminada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarAsistencias,
    obtenerAsistencia,
    eliminarAsistencia,
    listarAsistenciasCliente,
    newAsistenciaCliente,
    obtenerAsistenciaCliente
}