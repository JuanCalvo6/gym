const { getClientes,
        getClienteById,
        crearCliente,
        modificarCliente,
        darAlta,
        darBaja,
        eliminarCliente} = require('../models/clientesModel.js');

const listarClientes = async(req, res) =>{
    try {
        const clientes = await getClientes();

        if(clientes.length === 0) return res.status(400).json({message: "No hay clientes"})
        return res.send(clientes);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const obtenerCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);
    try {
        const cliente = await getClienteById(id);

        if(cliente.length === 0) res.status(400).json({message: "No hay un cliente con ese ID"});
        return res.send(cliente);

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const newCliente = async(req, res) =>{
    try {
        await crearCliente(req.body);
        return res.status(200).json({message: "Cliente creado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const updateCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await getClienteById(id);
        console.log(isMatch.length);
        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});

        await modificarCliente(req.body, id);
        return res.status(200).json({message: "Cliente modificado con exito"});
        
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darAltaCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const cliente = await getClienteById(id);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"})
        if(cliente[0].estado === 'A') return res.status(400).json({message: "El cliente ya se encuentra dado de Alta"});

        await darAlta(id);
        return res.status(200).json({message: "Cliente dado de Alta con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const darBajaCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const cliente = await getClienteById(id);

        if(cliente.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"})
        if(cliente[0].estado === 'B') return res.status(400).json({message: "El cliente ya se encuentra dado de Baja"});

        await darBaja(id);
        return res.status(200).json({message: "Cliente dado de Baja con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const deleteCliente = async(req, res) =>{
    const id = parseInt(req.params.id, 10);

    try {
        const isMatch = await getClienteById(id);

        if(isMatch.length === 0) return res.status(400).json({message: "No existe un cliente con ese ID"});
        await eliminarCliente(id);

        return res.status(200).json({message: "Cliente eliminado con exito"});

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    listarClientes,
    obtenerCliente,
    newCliente,
    updateCliente,
    darAltaCliente,
    darBajaCliente,
    deleteCliente
}