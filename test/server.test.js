const routes = require('../routes')
const MockAdapter = require("axios-mock-adapter");
const axios = require('axios')
const {app} = require('../app.js');
const request = require('supertest');

describe("Users service requests", () => {
    
    describe("POST request to users", () => {

        let mock = MockAdapter(axios);

        beforeEach(function() {
            mock
                .onGet('/users', {
                    
                }).reply(200, {"data": "hello world"});
        });
        test("test will pass", async () => {
            const response = await request(app).get('/users')
            expect(response.data).toBe("hello world!")
        });
    });

});
