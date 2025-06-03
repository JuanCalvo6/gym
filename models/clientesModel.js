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

const crearCliente = async(datos) =>{
    await pool.query(
        `INSERT INTO clientes
        (nombres, apellidos, tipoDni, dni, huella, telefono, direccion, mail, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [datos.nombres,
        datos.apellidos,
        datos.tipoDni,
        datos.dni,
        datos.huella,
        datos.telefono,
        datos.direccion,
        datos.mail,
        datos.estado]
    );
    return;
}

const modificarCliente = async(datos, id) =>{
    await pool.query(
        `UPDATE clientes
        SET 
            nombres = ?,
            apellidos = ?,
            tipoDni = ?,
            dni = ?,
            huella = ?,
            telefono = ?,
            direccion = ?,
            mail = ?,
            estado = ?
        WHERE idCliente = ?`,
        [datos.nombres,
        datos.apellidos,
        datos.tipoDni,
        datos.dni,
        datos.huella,
        datos.telefono,
        datos.direccion,
        datos.mail,
        datos.estado,
        id] 
    )
    return;
}

const darAlta = async(id) =>{
    await pool.query(
        `UPDATE clientes
        SET estado = 'A'
        WHERE idCliente = ?`,
        [id]
    );
    return;
}

const darBaja = async(id) =>{
    await pool.query(
        `UPDATE clientes
        SET estado = 'B'
        WHERE idCliente = ?`,
        [id]
    );
    return;
}

const eliminarCliente = async(id) =>{
    await pool.query(
        `DELETE
        FROM clientes
        WHERE idCliente = ?`,
        [id]
    );
    return;
}

module.exports = {
    getClientes,
    getClienteById,
    crearCliente,
    modificarCliente, 
    darAlta, 
    darBaja,
    eliminarCliente
}