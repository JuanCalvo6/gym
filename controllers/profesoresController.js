const bcrypt = require('bcryptjs');
const   {findAllProfesores,
         findProfesorById,
        findProfesorByDniByUsuario,
        findProfesorByMail,
        insertProfesor,
        updateProfesorById,
        updateBajaProfesorById,
        updateAltaProfesorById,
        deleteProfesorById} =  require('../models/profesoresModel.js');

const listarProfesores = async(req, res) =>{
    try {
        const profesores = await findAllProfesores();

        if(profesores.length === 0 ) return res.status(400).json({message: "No hay profesores"});
        return res.send(profesores);
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerProfesor = async(req, res) =>{
    const {id} =  req.params;
    try {
        const profesor = await findProfesorById(id);

        if(profesor.length === 0 ) return res.status(400).json({message: "No hay un profesor con ese ID"});
        return res.send(profesor);    

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const nuevoProfesor = async(req, res) =>{
    const {contraseña, dni, usuario, mail} = req.body;

    try {
        const profesorFound = await findProfesorByDniByUsuario(dni, usuario);
        if(profesorFound.length > 0)
            return res.status(400).json({message: "Ya existe un profesor con ese dni o usuario."});
        
        const matchMail = await findProfesorByMail(mail)
        if(matchMail.length > 0)
            return res.status(400).json({message: "Ya existe un profesor con ese mail."})
        
        const contraseñaHash = await bcrypt.hash(contraseña, 10);
        req.body.contraseña = contraseñaHash;

        await insertProfesor(req.body);
        return res.status(201).json({message: "Profesor creado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const modificarProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    const {dni, usuario} = req.body;
    console.log(req.body);
    try {
        const isMatchId = await findProfesorById(id);
        if(isMatchId.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        const isMatchDniUsuario = await findProfesorByDniByUsuario(dni, usuario);
        if(isMatchDniUsuario.length > 0){
            const conflicto = isMatchDniUsuario.some(match => match.idProfesor !== id);
            if(conflicto) return res.status(409).json({message: "Ya existe un profesor con ese dni o usuario"});
        }

        await updateProfesorById(req.body, id);
        return res.status(201).json({message: "Profesor modificado con exito"});
            
            
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const profesor = await findProfesorById(id);
        if(profesor.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        if(profesor[0].estado === 'B') return res.status(409).json({message: "El profesor ya se encuentra dado de Baja"});
        
        await updateBajaProfesorById(id);
        return res.status(201).json({message: "Profesor dado de Baja con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const darAltaProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const profesor = await findProfesorById(id);
        if(profesor.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        if(profesor[0].estado === 'A') return res.status(409).json({message: "El profesor ya se encuentra dado de Alta"});
        
        await updateAltaProfesorById(id);
        return res.status(201).json({message: "Profesor dado de alta con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const eliminarProfesor = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    try {
        const profesor = await findProfesorById(id);
        if(profesor.length === 0) return res.status(409).json({message: "No existe un profesor con ese ID"});

        await deleteProfesorById(id);
        return res.status(201).json({message: "Profesor eliminado con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    obtenerProfesor,
    listarProfesores,
    nuevoProfesor,
    modificarProfesor,
    darBajaProfesor,
    darAltaProfesor,
    eliminarProfesor
};