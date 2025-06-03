const { getClientes,
        getClienteById
} = require('../models/clientesModel.js');

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
    
}

const updateCliente = async(req, res) =>{
    
}

const darAltaCliente = async(req, res) =>{
    
}

const darBajaCliente = async(req, res) =>{
    
}

const deleteCliente = async(req, res) =>{
    
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