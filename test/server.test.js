const supertest = require("supertest");
const {app} = require("../app.js");
const moxios = require("moxios");
const request = supertest(app);
const jwt = require('jsonwebtoken')
var servicesRegistry = require('../routes/registry.json')

describe("API Gateway tests", () => {

    beforeEach(() => {
        moxios.install();
    
    });
    
    afterEach(() => {
        moxios.uninstall();
    });

    describe("Requests to users service", () => {
            
        it("01 GET to /users should return mocked response", async () => {
            moxios.stubRequest(/.*\/users/, {
                status: 200,
                response: {user: "Sol"},
            })

            const response = await request.get("/users").set('Authorization',  'Bearer faketoken');

            expect(response.status).toBe(200);
            expect(response.body.user).toBe("Sol");
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.users.url + "/users");
        });


        it("02 GET to /users/1 of registered user should return mocked response", async () => {
            moxios.stubRequest(/.*\/users\/1/, {
                status: 200,
                response: {user: "Solci"},
            })

            const response = await request.get("/users/1").set('Authorization',  'Bearer faketoken');
            expect(response.status).toBe(200);
            expect(response.body.user).toBe("Solci");
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.users.url + "/users/1");
            expect(JSON.parse(moxios.requests.mostRecent().config.data)).toMatchObject({})
        });


        it("03 POST to /users should return mocked response", async () => {
            moxios.stubRequest(/.*\/users/, {
                status: 200,
                response: {user: "Sol"},
            })

            const json={
                "user_type": "driver",
                "name": "Sol",
                "email": "sol@gmail.com",
                "password": "87654321",
                "phone_number": "12345678",
                "age": 22,
            }

            const response = await request.post("/users").send(json).set('Authorization', 'Bearer faketoken');

            expect(response.status).toBe(200);
            expect(response.body.user).toBe("Sol");
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.users.url + "/users");
            expect(JSON.parse(moxios.requests.mostRecent().config.data)).toMatchObject(json)
        });


        it("04 POST to /users/login should return mocked response", async () => {
            moxios.stubRequest(/.*\/users\/login/, {
                status: 200,
                response: {user: "Agus"},
            })

            const json={"email": "agus@gmail.com", "password": "87654321"}

            const response = await request.post("/users/login")
            .send(json)
            expect(response.status).toBe(200);
            expect(response.body.user).toBe("Agus");
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.users.url + "/users/login");
            expect(JSON.parse(moxios.requests.mostRecent().config.data)).toMatchObject(json)
        });

    });

    describe("Requests to admin service", () => {
        
        it("01 GET to /admins should return mocked response", async () => {
            moxios.stubRequest(/.*\/admins/, {
                status: 200,
                response: {user: "Sol"},
            })

            const response = await request.get("/admins").set('Authorization', 'Bearer faketoken');
            expect(response.status).toBe(200);
            expect(response.body.user).toBe("Sol");
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.admins.url + "/admins");
        });

        it("02 POST to /admins/login should return mocked response", async () => {
            moxios.stubRequest(/.*\/admins\/login/, {
                status: 401,
                statusText: "unauthorized user",
            })
            let response

            response = await request.post("/admins/login/")
            console.log(response)
            expect(response.status).toBe(401);
            expect(response.text).toBe("unauthorized user");
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.admins.url + "/admins/login/");
        });

    });

    describe("Requests to journey service", () => {

        it("01 GET to /journey should return mocked response", async () => {
            moxios.stubRequest(/.*\/journey\/info/, {
                status: 200,
                response: {price: 20},
            })

            const response = await request.get("/journey/info").set('Authorization', 'Bearer faketoken');
            expect(response.status).toBe(200);
            expect(response.body.price).toBe(20);
            expect(moxios.requests.mostRecent().url).toBe(servicesRegistry.services.journey.url + "/journey/info");
        });
    });

})