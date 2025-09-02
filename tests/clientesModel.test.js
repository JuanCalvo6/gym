//Test unitarios a nivel model me parecen muy elementales para hacer.
const pool = require('../config/db.js');
const {getAllClientes} = require('../models/clientesModel.js');

jest.mock('../config/db.js', ()=>({
    query: jest.fn(),
}));

describe("Unit test clientesModel", ()=>{
    test("traer todos los clientes", async()=>{
        const fakeClientes = [
            {idCliente: 1, nombres: "Juan", apellidos: "Calvó", estado: "A"},
            {idCliente: 2, nombres: "Persona", apellidos: "Apellido", estado: "B"}
        ];
        pool.query.mockResolvedValue([fakeClientes]);

        const result = await getAllClientes();

        expect(result).toEqual(fakeClientes);
    });

    test("traer todos los clientes pero no hay ninguno", async() =>{
        pool.query.mockResolvedValue([[]]);

        const result = await getAllClientes();

        expect(result).toEqual([]);
    })
});
