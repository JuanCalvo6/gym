function validarDatosLogin(datos, cookies){
    const errores = {};
    if(!datos){
        errores.datos = "No se enviaron datos";
        return errores;
    }
    const {usuario, contraseña } =  datos;
    const {token} = cookies;
    
    if(token) 
        errores.token = "Ya hay una sesión iniciada";

    if(!usuario?.trim())
        errores.usuario = "El usuario es obligatorio";

    if(!contraseña?.trim())
        errores.contraseña = "La contraseña es obligatoria";

    return errores;
}

module.exports  = validarDatosLogin; 