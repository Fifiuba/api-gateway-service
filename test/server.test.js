const supertest = require("supertest");
const {app} = require("../app.js");
const moxios = require("moxios");
const request = supertest(app);
const jwt = require('jsonwebtoken')

//NO funciona porque cuando se ejecuta axios moxios no intercepta las llamadas.

describe("Requests to users service", () => {

    beforeEach(() => {
        console.log("installing moxios...")
        moxios.install();
    
    });
    
    afterEach(() => {
        console.log("uninstalling moxios...")
        moxios.uninstall();
    });
        
    it("GET to /users should return mocked response", async () => {
        const token = 'Bearer ' + jwt.sign({}, process.env.SECRET_ACCESS_TOKEN);
        moxios.stubRequest(/.*\/users/, {
            status: 200,
            response: {user: "Sol"},
        })

        const response = await request.get("/users").set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.user).toBe("Sol");
        expect(moxios.requests.mostRecent().url).toBe("https://backend:8000/users/");
    });


    it("GET to /users/1 of registered user should return mocked response", async () => {
        const token = 'Bearer ' + jwt.sign({}, process.env.SECRET_ACCESS_TOKEN);
        moxios.stubRequest(/.*\/users\/1/, {
            status: 200,
            response: {user: "Solci"},
        })

        const response = await request.get("/users/1").set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.user).toBe("Sol");
        expect(moxios.requests.mostRecent().url).toBe("https://backend:8000/users/1");
        expect(moxios.requests.mostRecent().body).toBe({});
    });


    it("POST to /users should return mocked response", async () => {
        const token = 'Bearer ' + jwt.sign({}, process.env.SECRET_ACCESS_TOKEN);
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

        const response = await request.post("/users")
        .send(json)
        .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body.user).toBe("Sol");
        expect(moxios.requests.mostRecent().url).toBe("https://backend:8000/users/");
        expect(moxios.requests.mostRecent().body).toBe(json);
    });


    it("POST to /users/login should return mocked response", async () => {
        
        moxios.stubRequest(/.*\/users/, {
            status: 200,
            response: {user: "Agus"},
        })

        const json={"email": "agus@gmail.com", "password": "87654321"}

        const response = await request.post("/users")
        .send(json)

        expect(response.status).toBe(200);
        expect(response.body.user).toBe("Agus");
        expect(moxios.requests.mostRecent().url).toBe("https://backend:8000/users/login");
        expect(moxios.requests.mostRecent().body).toBe(json);
    });

});
/*
describe("Requests to admin service", () => {
    beforeEach(() => {
        moxios.install();
    
    });
    
    afterEach(() => {
        moxios.uninstall();
    });

});

describe("Requests to journey service", () => {
    beforeEach(() => {
        moxios.install();
    
    });
    
    afterEach(() => {
        moxios.uninstall();
    });

});*/