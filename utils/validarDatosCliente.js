function validarDatosCliente (datos){
    const tiposDocumento = ['dni','cuil','pasaporte','otro'];
    const errores = {};

    if(!datos.nombres)
        errores.nombres = "El nombre es obligatorio";
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombres))
        errores.nombres = "El nombre solo puede contener caracteres alfabéticos";

    if(!datos.apellidos)
        errores.apellidos = "El apellido es obligatorio";
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.apellidos))
        errores.apellidos ="El apellido solo puede contener caracteres alfabéticos";

    if(!tiposDocumento.includes(datos.tipoDni))
        errores.tipoDni = "Tipo de documento no válido";

    if(!datos.dni)
        errores.dni = "El documento es obligatorio";
    else if(!/^\d{1,20}$/.test(datos.dni))
        errores.dni = "El dni solo acepta números";

    if(datos.telefono && !/^\d{1,20}$/.test(datos.telefono))
        errores.telefono = "El telefono solo acepta números";

    if(datos.mail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datos.mail)) 
        errores.mail = 'El mail no tiene un formato válido.';

    return errores;
}

module.exports = validarDatosCliente;