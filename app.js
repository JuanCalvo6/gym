const express = require('express');
const cors = require('cors');
const autRoutes = require('./routes/autRoutes.js');
const profesoresRoutes = require('./routes/profesoresRoutes.js')
const ejerciciosRoutes =  require('./routes/ejerciciosRoutes.js');
const pasesRoutes = require('./routes/pasesRoutes.js');
const clientesRoutes = require('./routes/clientesRoutes.js');
const asistenciasRoutes = require('./routes/asistenciasRoutes.js');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes.js');
const rutinasRoutes = require('./routes/rutinasRoutes.js');
const lineasDeRutinaRoutes = require('./routes/lineasDeRutinaRoutes.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


//Aca van todas las rutas que vaya a usar...
//1. Iniciar sesión requiere autenticaciones...
app.use('/api', autRoutes);
app.use('/api', profesoresRoutes);
app.use('/api', ejerciciosRoutes);
app.use('/api', pasesRoutes);
app.use('/api', clientesRoutes);
app.use('/api', asistenciasRoutes);
app.use('/api', inscripcionesRoutes);
app.use('/api', rutinasRoutes);
app.use('/api', lineasDeRutinaRoutes);

module.exports = app;
