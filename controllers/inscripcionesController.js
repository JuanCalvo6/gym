const { getClienteById } = require('../models/clientesModel.js');
const {getProfesorById} = require('../models/profesoresModel.js');
const {getPaseById} = require('../models/pasesModel.js');
const { getInscripciones,
        getInscripcionById,
        getInscripcionesByCliente,
        getInscripcionesAltaByCliente,
        getInscripcionByCliente,
        crearInscripcion,
        updateInscripcion,
        darAlta, darBaja,
        deleteInscripcion} = require('../models/inscripcionesModel.js');

const listarInscripciones = async(req, res) =>{
    try {
        const inscripciones = await getInscripciones();

        if(inscripciones.length === 0) return res.status(400).json({message: "No hay inscripciones"});

        return res.send(inscripciones);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerInscripcion = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const inscripcion = await getInscripcionById(id);

        if(inscripcion.length === 0) return res.status(400).json({message: "No existe una inscripcion con ese ID"});
        return res.send(inscripcion);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const listarInscripcionesCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    const {incluirBajas} = req.query;
    const bajas = incluirBajas === 'true';

    try {
        const cliente = await getClienteById(id);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});

        let inscripciones;
        if(bajas){
            inscripciones = await getInscripcionesByCliente(id);
        }else{
            inscripciones = await getInscripcionesAltaByCliente(id);
        }

        if(inscripciones.length === 0) return res.status(400).json({message: "El cliente no tiene inscripciones"});
        return res.send(inscripciones);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerInscripcionCliente = async(req, res) =>{
    const idCliente = parseInt(req.params.id, 10);
    const idInscripcion = parseInt(req.params.idInscripcion, 10);

    try {
        const cliente = await getClienteById(idCliente);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const inscripcion = await getInscripcionByCliente(idCliente, idInscripcion);

        if(inscripcion.length === 0) return res.status(400).json({message: "El cliente no tiene una inscripcion con ese ID"});
        return res.send(inscripcion);

    } catch (error) {
        return res.status(400).json({message: error.message}); 
    }
}

const newInscripcionCliente = async(req, res) =>{
    const idCliente = parseInt(req.params.id, 10);
    const {idProfesor, idPase} = req.body;
    
    try {
        const cliente = await getClienteById(idCliente);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        const profesor = await getProfesorById(idProfesor);

        if(profesor.length === 0) return res.status(400).json({message: "No existe un profesor con ese ID"});
        const pase = await getPaseById(idPase);

        if(pase.length === 0) return res.status(400).json({message: "No existe un pase con ese ID"});
        const inscripciones = await getInscripcionesAltaByCliente(idCliente);

        if(inscripciones.length > 0) return res.status(400).json({message: "El cliente ya tiene una inscripcion en Alta"});
        await crearInscripcion(req.body, idCliente);
        return res.status(200).json({message: "Inscripcion creada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message}); 
    }
}

const modificarInscripcion = async(req, res) =>{
    const idInscripcion = parseInt(req.params.id, 10);
    const {idProfesor, idPase} = req.body;
    
    try {
        const inscripcion = await getInscripcionById(idInscripcion);

        if(inscripcion.length === 0) return res.status(400).json({message: "No existe un inscripcion con ese ID"});
        const profesor = await getProfesorById(idProfesor);

        if(profesor.length === 0) return res.status(400).json({message: "No existe un profesor con ese ID"});
        const pase = await getPaseById(idPase);

        if(pase.length === 0) return res.status(400).json({message: "No existe un pase con ese ID"});
        await updateInscripcion(req.body, idInscripcion, inscripcion[0].idCliente);
        return res.status(200).json({message: "Inscripcion modificada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message}); 
    }
}

const darAltaInscripcion = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const inscripcion = await getInscripcionById(id);

        if(inscripcion.length === 0) return res.status(400).json({message: "No existe una inscripcion con ese ID"});
        if(inscripcion[0].estado === 'A') return res.status(400).json({message: "La inscripcion ya se encuentra dada de Alta"});

        const inscripciones = await getInscripcionesAltaByCliente(id);
        if(inscripciones.length > 0) return res.status(400).json({message: "Ya existe una inscripcion de Alta"})

        await darAlta(id);
        return res.status(200).json({message: "Inscripcion dada de Alta con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaInscripcion = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const inscripcion = await getInscripcionById(id);

        if(inscripcion.length === 0) return res.status(400).json({message: "No existe una inscripcion con ese ID"});
        if(inscripcion[0].estado === 'B') return res.status(400).json({message: "La inscripcion ya se encuentra dada de Baja"});

        await darBaja(id);
        return res.status(200).json({message: "Inscripcion dada de Baja con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const eliminarInscripcion = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    try {
        const inscripcion = await getInscripcionById(id);

        if(inscripcion.length === 0) return res.status(400).json({message: "No existe una inscripcion con ese ID"});
        await deleteInscripcion(id);

        return res.status(200).json({message: "Inscripcion eliminada con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarInscripciones,
    obtenerInscripcion,
    darAltaInscripcion,
    darBajaInscripcion,
    eliminarInscripcion,
    modificarInscripcion,
    listarInscripcionesCliente,
    obtenerInscripcionCliente,
    newInscripcionCliente
}