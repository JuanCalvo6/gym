function validarDatosCliente (datos){
    const tiposDocumento = ['dni','cuil','pasaporte','otro'];
    const errores = [];

    if(!datos.nombres)
        errores.push("El nombre es obligatorio");

    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombres))
        errores.push("El nombre solo puede contener caracteres alfabéticos");

    if(!datos.apellidos)
        errores.push("El apellido es obligatorio");

    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.apellidos))
        errores.push("El apellido solo puede contener caracteres alfabéticos");

    if(!tiposDocumento.includes(datos.tipoDni))
        errores.push("Tipo de documento no válido");

    if(!datos.dni)
        errores.push("El documento es obligatorio");

    if(!/^\d{1,20}$/.test(datos.dni))
        errores.push("El dni solo acepta números");

    if(!datos.huella)
        errores.push("La huella es obligatoria");

    if(datos.telefono && !/^\d{1,20}$/.test(datos.telefono))
        errores.push("El telefono solo acepta números");

    if(datos.mail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datos.mail)) 
        errores.push('El mail no tiene un formato válido.');

    if (!['A', 'B'].includes(datos.estado)) 
        errores.push('El estado debe ser A (activo) o B (baja).');

    return errores;
}

module.exports = validarDatosCliente;