
const validarRol = (rol) =>{
    return (req, res, next) =>{
        const {tipo} = req.user;
        console.log(tipo, rol);
        console.log( tipo !== rol)

        if(tipo !== rol)
            return res.status(401).json({message: "Rol incorrecto"});

        res.user = req.user;
        next();
}}


module.exports = {
    validarRol
};