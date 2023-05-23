// const mongoose = require('mongoose');
const server = require('../server');
const request = require("supertest");
require("dotenv").config();

describe("GET /user/list", () => {
    it("should return all users", async () => {
        const res = await request(server).get("/user/list");
        expect(res.body.success).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body.users.length).toBeGreaterThan(0);
    });
});


describe("POST /user/register", () => {
    it("should create a user", async () => {
        const res = await request(server).post("/user/register").send({
            email: "sumit.mhatre@niveussolutons.com",
            name: "sumit mhatre",
            mobile: 7506775565,
            gender: "Male"
        });
        expect(res.body.success).toBe(true);
        expect(res.statusCode).toBe(201);
    });
});

describe("PUT /user/update/:id", () => {
    it("should update a user", async () => {
        const res = await request(server)
            .put("/user/update/646c8baac3908b33b7759d3e")
            .send({
                name: "John Cena",
                email: "john.cena25@gmail.com",
                gender: "Male"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });
});