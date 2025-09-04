const { findAllAsistencias,
        findAsistenciaById,
        deleteAsistenciaById,
        findAllAsistenciasByIdCliente,
        findAsistenciaByIdByIdCliente,
        insertAsistenciaByIdCliente
} = require('../models/asistenciasModel.js');
const { findClienetById, findAltaClienteById } = require('../models/clientesModel.js');

const listarAsistencias = async(req, res) =>{
    try {
        const asistencias =  await findAllAsistencias();

        if(asistencias.length === 0) return res.status(400).json({message: "No hay asistencias"});
        return res.send(asistencias);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerAsistencia = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const asistencia = await findAsistenciaById(id);
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
        const isMatch = await findClienetById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const asistencias = await findAllAsistenciasByIdCliente(id);

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
        const isMatch = await findClienetById(id);
        
        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const asistencia = await findAsistenciaByIdByIdCliente(id, idAsistencia);
        
        if(asistencia.length === 0) return res.status(400).json({message: "El cliente no tiene una asistencia con ese ID"});
        return res.send(asistencia);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const crearAsistenciaCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await findAltaClienteById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente en Alta con ese ID"});

        await insertAsistenciaByIdCliente(req.body, id);
        return res.status(200).json({message: "Asistencia creada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarAsistencia = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await findAsistenciaById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe una asistencia con ese ID"});
        await deleteAsistenciaById(id);
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
    crearAsistenciaCliente,
    obtenerAsistenciaCliente
}