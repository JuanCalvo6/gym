

const validarLogin = (req, res, next) =>{
    const {usuario, contraseña } =  req.body;
    const {token} = req.cookies;
    const errores = {}

    if(token) return res.status(400).json({message: "Ya hay una sesión iniciada"})

    if(!usuario?.trim())
        errores.usuario = "El usuario es obligatorio";

    if(!contraseña?.trim())
        errores.contraseña = "La contraseña es obligatoria";

    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});
    
    next();
}

module.exports = {
    validarLogin
};