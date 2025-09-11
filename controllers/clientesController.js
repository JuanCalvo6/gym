const { findAllClientes, findAllClientesByNombresByApellidos, 
        findAltaClientes, findAltaClientesByNombresByApellidos,
        findClienteById,
        findClienteByDni,
        insertCliente,
        updateClienteById,
        updateAltaClienteById,
        updateBajaClienteById,
        deleteClienteById} = require('../models/clientesModel.js');

const listarClientes = async(req, res) =>{
    const {cadena, incluirBajas} = req.query;
    const bajas = incluirBajas === 'true';

    try {
        if(bajas){
            if(cadena === ''){
                const clientes = await findAllClientes()
                if(clientes.length === 0) return res.status(400).json({errores:{message: "No hay clientes"}})
                return res.send(clientes);
            }
            else{
                const clientes = await findAllClientesByNombresByApellidos(cadena)
                if(clientes.length === 0) return res.status(400).json({errores:{message: "No hay clientes con ese apellido"}})
                return res.send(clientes);
            }
        }
        else{
            if(cadena === ''){
                const clientes = await findAltaClientes()
                if(clientes.length === 0) return res.status(400).json({errores:{message: "No hay clientes de Alta"}})
                return res.send(clientes);
            }
            else{
                const clientes = await findAltaClientesByNombresByApellidos(cadena)
                if(clientes.length === 0) return res.status(400).json({errores:{message: "No hay clientes de Alta con ese apellido"}})
                return res.send(clientes);
            }            
        }  
    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

const obtenerCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    try {
        const cliente = await findClienteById(id);

        if(cliente.length === 0) res.status(400).json({errores:{message: "No hay un cliente con ese ID"}});
        return res.send(cliente);

    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

const crearCliente = async(req, res) =>{
    const {dni} = req.body;

    try {
        const cliente = await findClienteByDni(dni)
        if(cliente.length > 0) return res.status(400).json({errores:{message: "Ya hay un cliente con ese dni"}});

        await insertCliente(req.body);
        return res.status(200).json({errores:{message: "Cliente creado con exito"}});

    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

const modificarCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await findClienteById(id);
        console.log(isMatch.length);
        if(isMatch.length === 0) return res.status(400).json({errores:{message: "No existe un cliente con ese ID"}});

        await updateClienteById(req.body, id);
        return res.status(200).json({errores:{message: "Cliente modificado con exito"}});
        
    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

const darAltaCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const cliente = await findClienteById(id);

        if(cliente.length === 0) return res.status(400).json({errores:{message: "No existe un cliente con ese ID"}})
        if(cliente[0].estado === 'A') return res.status(400).json({errores:{message: "El cliente ya se encuentra dado de Alta"}});

        await updateAltaClienteById(id);
        return res.status(200).json({errores:{message: "Cliente dado de Alta con exito"}});

    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

const darBajaCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const cliente = await findClienteById(id);

        if(cliente.length === 0) return res.status(400).json({errores:{message: "No existe un cliente con ese ID"}})
        if(cliente[0].estado === 'B') return res.status(400).json({errores:{message: "El cliente ya se encuentra dado de Baja"}});

        await updateBajaClienteById(id);
        return res.status(200).json({errores:{message: "Cliente dado de Baja con exito"}});

    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

const eliminarCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await findClienteById(id);

        if(isMatch.length === 0) return res.status(400).json({errores:{message: "No existe un cliente con ese ID"}});
        await deleteClienteById(id);

        return res.status(200).json({errores:{message: "Cliente eliminado con exito"}});

    } catch (error) {
        return res.status(400).json({errores:{message: error.message}});
    }
}

module.exports = {
    listarClientes,
    obtenerCliente,
    crearCliente,
    modificarCliente,
    darAltaCliente,
    darBajaCliente,
    eliminarCliente
}