

const validarLogin = (req, res, next) =>{
    const {usuario, contraseña } =  req.body;
    const {token} = req.cookies;

    if(token) return res.status(400).json({message: "Ya hay una sesión iniciada"})

    if(!usuario?.trim() || !contraseña?.trim()){
        return res.status(400).json({message: "Campos obligatorios"});
    }
    
    next();
}

module.exports = {
    validarLogin
};