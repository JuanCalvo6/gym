const bcrypt = require('bcryptjs');

const hashearContraseña = async(contraseña)=>{
    const res = await bcrypt.hash(contraseña, 10);

    return res;
}

module.exports = {hashearContraseña};