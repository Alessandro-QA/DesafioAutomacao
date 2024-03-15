describe('Testes da API', () => {
    it('GET: Deve retornar os usuários corretamente', () => {
        cy.request('GET', 'http://jsonplaceholder.typicode.com/users').then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(user => {
                expect(user).to.have.property('id').that.is.a('number'); 
            });

            const schema = {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'],
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        address: {
                            type: 'object',
                            required: ['street', 'suite', 'city', 'zipcode', 'geo'],
                            properties: {
                                street: { type: 'string' },
                                suite: { type: 'string' },
                                city: { type: 'string' },
                                zipcode: { type: 'string' },
                                geo: {
                                    type: 'object',
                                    required: ['lat', 'lng'],
                                    properties: {
                                        lat: { type: 'string' },
                                        lng: { type: 'string' }
                                    }
                                }
                            }
                        },
                        phone: { type: 'string' },
                        website: { type: 'string', format: 'uri' },
                        company: {
                            type: 'object',
                            required: ['name', 'catchPhrase', 'bs'],
                            properties: {
                                name: { type: 'string' },
                                catchPhrase: { type: 'string' },
                                bs: { type: 'string' }
                            }
                        }
                    }
                }
            };
        });
    });

    it('POST: Deve criar um novo usuário', () => {
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
           
        };
        cy.request('POST', 'http://jsonplaceholder.typicode.com/users', newUser).then((response) => {
            expect(response.status).to.equal(201);
            
            const schema = {
                type: 'object',
                required: ['name', 'email'], 
                properties: {
                    name: { type: 'string' }, 
                    email: { type: 'string', format: 'email' } 
                    
                }
            };
        });
    });
    it('PUT: Deve atualizar um usuário existente', () => {
        const updatedUser = {
            id: 1,
            name: 'Updated Name',
            
        };
        cy.request('PUT', 'http://jsonplaceholder.typicode.com/users/1', updatedUser).then((response) => {
            expect(response.status).to.equal(200);
            
            const schema = {
                type: 'object',
                required: ['id', 'name'], 
                properties: {
                    id: { type: 'number' }, 
                    name: { type: 'string' } 
                }
            };
        });
    });
    
    it('DELETE: Deve excluir um usuário existente', () => {
        cy.request('DELETE', 'http://jsonplaceholder.typicode.com/users/1').then((response) => {
            expect(response.status).to.equal(200);
            // Adicione mais verificações conforme necessário
        });
    });
});