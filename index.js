require('dotenv').config();
require('./config/cron.js');
const app = require('./app.js');


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});