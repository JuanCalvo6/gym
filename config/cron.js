const { updateBajaInscripcionById,
        findAltaInscripcionesByIdCliente,
        findAltaInscripcionesByDiaFin
} = require('../models/inscripcionesModel.js');

const { findAltaClientes,
        updateBajaClienteById
} = require('../models/clientesModel.js');

const cron = require('node-cron');

cron.schedule('0 0,12 * * *', async() => {
    console.log('running a task...');
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split("T")[0];

    try {
        const inscripciones = await findAltaInscripcionesByDiaFin(fechaFormateada);

        if(inscripciones.length > 0){
            for(const inscripcion of inscripciones){
                await updateBajaInscripcionById(inscripcion.idInscripcion);
            }
        }

        const clientes = await findAltaClientes();
        if(clientes.length > 0){
            for(const cliente of clientes){
                const inscripciones = await findAltaInscripcionesByIdCliente(cliente.idCliente);
                if(inscripciones.length === 0)
                    await updateBajaClienteById(cliente.idCliente);
            }
        }
        console.log("Actualizacion de estados realizada");

    } catch (error) {
        console.log("Error en el cron: ", error);
    }

});