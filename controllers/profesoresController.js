const bcrypt = require('bcryptjs');
const   {getProfesores,
         getProfesorById,
        getProfesorByDniUsuario,
        crearProfesor,
        modificarProfesor,
        darBaja,
        darAlta,
        eliminarProfesor} =  require('../models/profesoresModel.js');

const listarProfesores = async(req, res) =>{
    try {
        const profesores = await getProfesores();

        if(profesores.length === 0 ) return res.status(400).json({message: "No hay profesores"});
        return res.send(profesores);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerProfesor = async(req, res) =>{
    const {id} =  req.params;
    try {
        const profesor = await getProfesorById(id);

        if(profesor.length === 0 ) return res.status(400).json({message: "No hay un profesor con ese ID"});
        return res.send(profesor);    

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const newProfesor = async(req, res) =>{
    const {contraseña, dni, usuario} = req.body;

    try {
        const profesorFound = await getProfesorByDniUsuario(dni, usuario);
        if(profesorFound.length > 0)
            return res.status(409).json({message: "Ya existe un profesor con ese dni o usuario"});
        
        const contraseñaHash = await bcrypt.hash(contraseña, 10);
        req.body.contraseña = contraseñaHash;

        await crearProfesor(req.body);
        return res.status(201).json({message: "Profesor creado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const updateProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    const {contraseña, dni, usuario} = req.body;
    
    try {
        const isMatchId = await getProfesorById(id);
        if(isMatchId.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        const isMatchDniUsuario = await getProfesorByDniUsuario(dni, usuario);
        if(isMatchDniUsuario.length > 0){
            const conflicto = isMatchDniUsuario.some(match => match.idProfesor !== id);
            if(conflicto) return res.status(409).json({message: "Ya existe un profesor con ese dni o usuario"});
        }

        const contraseñaHash = await bcrypt.hash(contraseña, 10);
        req.body.contraseña = contraseñaHash;

        await modificarProfesor(req.body, id);
        return res.status(201).json({message: "Profesor modificado con exito"});
            
            
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const profesor = await getProfesorById(id);
        if(profesor.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        if(profesor[0].estado === 'B') return res.status(409).json({message: "El profesor ya se encuentra dado de Baja"});
        
        await darBaja(id);
        return res.status(201).json({message: "Profesor dado de Baja con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const darAltaProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const profesor = await getProfesorById(id);
        if(profesor.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        if(profesor[0].estado === 'A') return res.status(409).json({message: "El profesor ya se encuentra dado de Alta"});
        
        await darAlta(id);
        return res.status(201).json({message: "Profesor dado de alta con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const deleteProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    try {
        const profesor = await getProfesorById(id);
        if(profesor.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        await eliminarProfesor(id);
        return res.status(201).json({message: "Profesor eliminado con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    obtenerProfesor,
    listarProfesores,
    newProfesor,
    updateProfesor,
    darBajaProfesor,
    darAltaProfesor,
    deleteProfesor
};