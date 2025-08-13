function validarDatosProfesor(datos){
    const errores = [];

    if(!datos.nombres)
        errores.push("El nombre es obligatorio")
    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombres))
        errores.push("El nombre solo debe poseer caracteres alfabéticos");

    if(!datos.apellidos)
        errores.push("El apellido es obligatorio")
    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.apellidos))
        errores.push("El apellido solo debe poseer caracteres alfabéticos");

    if(!datos.dni)
        errores.push("El dni es obligatorio");
    if(!/^\d{1,20}$/.test(datos.dni))
        errores.push("El dni solo acepta números");

    if(datos.telefono && !/^\d{1,20}$/.test(datos.telefono))
        errores.push("El telefono solo acepta números");

    if(datos.mail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datos.mail)) 
        errores.push('El mail no tiene un formato válido.');

    if(!datos.usuario)
        errores.push('El usuario es obligatorio.');

    if(!datos.contraseña)
        errores.push('La contraseña es obligatorio.');
    
    return errores;
}   

module.exports = validarDatosProfesor;