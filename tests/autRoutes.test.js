const app = require('../app.js');
const pool = require('../config/db.js');
const request = require('supertest');
const { insertProfesor, findProfesorByDniByUsuario, deleteProfesorById } = require('../models/profesoresModel.js');
const { hashearContraseña } = require('../utils/hashearContraseña.js');

describe('Test de integración Autenticación:', ()=>{
    const testUser = {
        nombres: "test", 
        apellidos: "test", 
        dni: "1234", 
        telefono: "1234", 
        direccion: "test 123", 
        mail: "test@test.com", 
        usuario: "test", 
        contraseña: "1234"
    }
    let agente;

    beforeAll(async ()=>{
        const contraseñaHash = await hashearContraseña(testUser.contraseña);
        testUser.contraseña =  contraseñaHash;
        await insertProfesor(testUser);
        agente =  request.agent(app);
    });

    afterAll(async ()=>{
        const profesor = await findProfesorByDniByUsuario(testUser.dni, testUser.usuario);
        await deleteProfesorById(profesor[0].idProfesor);
        await pool.end();
    })

    describe('/POST login', ()=>{
        test('Deberia responder con status 400, no se enviaron datos', async()=>{
            const response = await request(app).post('/api/login').send();
            expect(response.status).toBe(400);
        });
        test('Deberia responder con status 400, campos vacios', async()=>{
            fields =[
                {},
                {usuario: "prueba"},
                {contraseña: "prueba"}
            ]
            for(const field of fields){
                const response = await request(app).post('/api/login').send(field);
                expect(response.status).toBe(400);
            }
        });
        test('Deberia responder con status 400, usuario incorrecto', async()=>{
            const response = await request(app).post('/api/login').send({
                usuario: "test1",
                contraseña: "1234"
            });
            expect(response.status).toBe(400);
        });
        test('Deberia responder con status 400, contraseña incorrecto', async()=>{
            const response = await request(app).post('/api/login').send({
                usuario: "test",
                contraseña: "123456"
            });
            expect(response.status).toBe(400);
        });
        test('Deberia responder con status 200, sesion iniciada', async()=>{
            const response = await agente.post('/api/login').send({
                usuario: "test",
                contraseña: "1234"
            });
            console.log(response);
            expect(response.status).toBe(200);
        })

    })
    

    
});