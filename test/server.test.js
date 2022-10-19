const supertest = require("supertest");
const {app} = require("../app.js");
const moxios = require("moxios");
const request = supertest(app);
const jwt = require('jsonwebtoken')

describe("Requests to users service", () => {

    beforeEach(() => {
        console.log("installing moxios...")
        moxios.install();
    
    });
    
    afterEach(() => {
        console.log("uninstalling moxios...")
        moxios.uninstall();
    });
        
    it("01 GET to /users should return mocked response", async () => {
        const token = 'Bearer ' + jwt.sign({}, process.env.SECRET_ACCESS_TOKEN);
        moxios.stubRequest(/.*\/users/, {
            status: 200,
            response: {user: "Sol"},
        })

        const response = await request.get("/users").set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.user).toBe("Sol");
        expect(moxios.requests.mostRecent().url).toBe("http://backend:8000/users");
    });


    it("02 GET to /users/1 of registered user should return mocked response", async () => {
        const token = 'Bearer ' + jwt.sign({}, process.env.SECRET_ACCESS_TOKEN);
        moxios.stubRequest(/.*\/users\/1/, {
            status: 200,
            response: {user: "Solci"},
        })

        const response = await request.get("/users/1").set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.user).toBe("Solci");
        expect(moxios.requests.mostRecent().url).toBe("http://backend:8000/users/1");
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toMatchObject({})
    });


    it("03 POST to /users should return mocked response", async () => {
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
        expect(moxios.requests.mostRecent().url).toBe("http://backend:8000/users");
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
        expect(moxios.requests.mostRecent().url).toBe("http://backend:8000/users/login");
        expect(JSON.parse(moxios.requests.mostRecent().config.data)).toMatchObject(json)
    });

});
