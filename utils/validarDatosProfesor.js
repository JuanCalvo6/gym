function validarDatosProfesor(datos){
    const errores = [];

    if(!datos.nombres)
        errores.nombres = "El nombre es obligatorio";
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombres))
        errores.nombres = "El nombre solo debe poseer caracteres alfabéticos";

    if(!datos.apellidos)
        errores.apellidos = "El apellido es obligatorio"
    else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.apellidos))
        errores.apellidos = "El apellido solo debe poseer caracteres alfabéticos";

    if(!datos.dni)
        errores.dni = "El dni es obligatorio";
    else if(!/^\d{1,20}$/.test(datos.dni))
        errores.dni = "El dni solo acepta números";

    if(datos.telefono && !/^\d{1,20}$/.test(datos.telefono))
        errores.telefono = "El telefono solo acepta números";

    if(datos.mail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datos.mail)) 
        errores.mail = 'El mail no tiene un formato válido.';

    if(!datos.usuario)
        errores.usuario = 'El usuario es obligatorio.';

    if(!datos.contraseña)
        errores.contraseña = 'La contraseña es obligatorio.';
    
    return errores;
}   

module.exports = validarDatosProfesor;