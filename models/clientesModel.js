const pool = require('../config/db.js');

const getClientes = async() =>{
    const [clientes] =  await pool.query(
        `SELECT nombres, apellidos, tipoDni, dni, huella, telefono, direccion, mail, estado
        FROM clientes`
    );
    return clientes;
}

const getClienteById = async(id) =>{
    const [cliente] = await pool.query(
        `SELECT nombres, apellidos, tipoDni, dni, huella, telefono, direccion, mail, estado
        FROM clientes
        WHERE idCliente = ?`,
        [id]
    );
    return cliente;
}

module.exports = {
    getClientes,
    getClienteById
}