function validarDatosLogin(datos, cookies){
    const {usuario, contraseña } =  datos;
    const {token} = cookies;
    const errores = {};

    if(token) 
        errores.token = "Ya hay una sesión iniciada";

    if(!usuario?.trim())
        errores.usuario = "El usuario es obligatorio";

    if(!contraseña?.trim())
        errores.contraseña = "La contraseña es obligatoria";

    return errores;
}

module.exports  = validarDatosLogin; 