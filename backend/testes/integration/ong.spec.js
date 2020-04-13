const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/conection')

//npm test

describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async ()=>{
        await connection.destroy();
    })

    it('should be able to create a new ONG',async()=> {
        const response = await request (app).post('/ongs').send({
            nome:"kkkkkk2",
            email:"contatoapae@org.br",
            telefone:"86 90000-0000",
            cidade:"poooo",
            uf:"PI"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    
})