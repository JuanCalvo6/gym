const { getPases,
        getPaseById,
        getPaseByNombre,
        crearPase,
        modificarPase,
        darAlta,
        darBaja,
        eliminarPase} = require('../models/pasesModel.js');

const listarPases = async(req, res) =>{
    try {
        const pases = await getPases();

        if(pases.length === 0) return res.status(400).json({message: "No hay pases "})
        return res.send(pases);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerPase = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const pase = await getPaseById(id);

        if(pase.length === 0) return res.status(400).json({message: "No hay un pase con ese ID"});
        return res.send(pase);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const newPase = async(req, res) =>{
    const {nombre} =  req.body;

    try {
        const paseFound = await getPaseByNombre(nombre);

        if(paseFound.length > 0) return res.status(400).json({message: "Ya existe un pase con ese nombre"});

        await crearPase(req.body);
        return res.status(200).json({message: "Pase creado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const updatePase = async(req, res) =>{
    const {nombre} =  req.body;
    const id = parseInt(req.params.id);

    try {
        const isMatchId = await getPaseById(id);

        if(isMatchId.length === 0) return res.status(400).json({message: "No existe un pase con ese ID"});
        const isMatchNombre = await getPaseByNombre(nombre);

        if(isMatchNombre.length > 0){
            const conflicto = isMatchNombre.some(match => match.idPase !== id);
            if(conflicto) return res.status(409).json({message: "Ya existe un pase con ese nombre"});
        }

        await modificarPase(req.body, id);
        return res.status(200).json({message: "Pase modificado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darAltaPase = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatchId = await getPaseById(id);
        if(isMatchId.length === 0) return res.status(400).json({message: "No existe un pase con ese ID"});

        if(isMatchId[0].estado === 'A') return res.status(400).json({message: "El pase ya se encuentra dado de Alta"})
        await darAlta(id);
        return res.status(200).json({message: "Pase dado de alta con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaPase = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatchId = await getPaseById(id);
        console.log(isMatchId[0]);
        if(isMatchId.length === 0) return res.status(400).json({message: "No existe un pase con ese ID"});

        if(isMatchId[0].estado === 'B') return res.status(400).json({message: "El pase ya se encuentra dado de Baja"})
        await darBaja(id);
        return res.status(200).json({message: "Pase dado de Baja con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const deletePase = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatchId = await getPaseById(id);

        if(isMatchId.length === 0) return res.status(400).json({message: "No existe un pase con ese ID"});

        await eliminarPase(id);
        return res.status(200).json({message: "Pase eliminado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports ={
    listarPases,
    obtenerPase,
    newPase,
    updatePase,
    darAltaPase,
    darBajaPase,
    deletePase
};