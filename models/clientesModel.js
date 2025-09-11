const pool = require('../config/db.js');

const findAllClientes = async() =>{
    const [clientes] =  await pool.query(
        `SELECT idCliente, nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        ORDER BY estado, apellidos, nombres`
    );
    return clientes;
}

const findAllClientesByNombresByApellidos = async(cadena) =>{
    const exp = `${cadena}%`;

    const [clientes] =  await pool.query(
        `SELECT idCliente, nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        WHERE apellidos LIKE ? OR nombres LIKE ?
        ORDER BY estado, apellidos, nombres`,
        [exp, exp]
    );
    return clientes;
}

const findAltaClientes = async() =>{
    const [clientes] =  await pool.query(
        `SELECT idCliente, nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        WHERE estado = 'A'
        ORDER BY estado, apellidos, nombres`
    );
    return clientes;
}

const findAltaClientesByNombresByApellidos = async(cadena) =>{
    const exp = `${cadena}%`;

    const [clientes] =  await pool.query(
        `SELECT idCliente, nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        WHERE estado = 'A' AND (apellidos LIKE ? OR nombres LIKE ?)
        ORDER BY estado, apellidos, nombres`,
        [exp, exp]
    );
    return clientes;
}

const findClienteById = async(id) =>{
    const [cliente] = await pool.query(
        `SELECT nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        WHERE idCliente = ?`,
        [id]
    );
    return cliente;
}

const findClienteByDni = async(dni) =>{
    const [cliente] = await pool.query(
        `SELECT nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        WHERE dni = ?`,
        [dni]
    );

    return cliente;
}

const findAltaClienteById = async(id) =>{
    const [cliente] = await pool.query(
        `SELECT nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado
        FROM clientes
        WHERE idCliente = ? AND estado = 'A'`,
        [id]
    );
    return cliente;
}

const insertCliente = async(datos) =>{
    await pool.query(
        `INSERT INTO clientes
        (nombres, apellidos, tipoDni, dni, telefono, direccion, mail, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'A')`,
        [datos.nombres,
        datos.apellidos,
        datos.tipoDni,
        datos.dni,
        datos.telefono,
        datos.direccion,
        datos.mail]
    );
    return;
}

const updateClienteById = async(datos, id) =>{
    await pool.query(
        `UPDATE clientes
        SET 
            nombres = ?,
            apellidos = ?,
            tipoDni = ?,
            dni = ?,
            telefono = ?,
            direccion = ?,
            mail = ?,
            estado = ?
        WHERE idCliente = ?`,
        [datos.nombres,
        datos.apellidos,
        datos.tipoDni,
        datos.dni,
        datos.telefono,
        datos.direccion,
        datos.mail,
        datos.estado,
        id] 
    )
    return;
}

const updateAltaClienteById = async(id) =>{
    await pool.query(
        `UPDATE clientes
        SET estado = 'A'
        WHERE idCliente = ?`,
        [id]
    );
    return;
}

const updateBajaClienteById = async(id) =>{
    await pool.query(
        `UPDATE clientes
        SET estado = 'B'
        WHERE idCliente = ?`,
        [id]
    );
    return;
}

const deleteClienteById = async(id) =>{
    await pool.query(
        `DELETE
        FROM clientes
        WHERE idCliente = ?`,
        [id]
    );
    return;
}

module.exports = {
    findAllClientes, findAllClientesByNombresByApellidos,
    findAltaClientes, findAltaClientesByNombresByApellidos,
    findClienteById,
    findClienteByDni,
    findAltaClienteById,
    insertCliente,
    updateClienteById, 
    updateAltaClienteById, 
    updateBajaClienteById,
    deleteClienteById
}