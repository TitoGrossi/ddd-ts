import { app, sequelize } from "../express";
import request from "supertest";
import CustomerModel from "../../db/sequelize/model/customer.model";

describe("E2E tests for customer", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await CustomerModel.destroy({ where: {}, truncate: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip",
            },
        })
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("Zip");
    })

    it("should not create a customer and should return an error", async () => {
        const response = await request(app).post("/customer").send({
            name: "John",
        })
        expect(response.statusCode).toBe(400);
    })

    it("should retrieve all customers", async () => {
        for (let i = 1; i < 3; i++) {
            await request(app).post("/customer").send({
                name: `John${i}`,
                address: {
                    street: `Street${i}`,
                    city: `City${i}`,
                    number: i,
                    zip: `Zip${i}`,
                },
            })
        }

        const response = await request(app).get("/customer").send()

        expect(response.statusCode).toBe(200);
        expect(response.body.customers.length).toBe(2);
        expect(response.body.customers[0]).toEqual({
            id: response.body.customers[0].id,
            name: "John1",
            address: {
                street: "Street1",
                city: "City1",
                number: 1,
                zip: "Zip1",
            },
        });
        expect(response.body.customers[1]).toEqual({
            id: response.body.customers[1].id,
            name: "John2",
            address: {
                street: "Street2",
                city: "City2",
                number: 2,
                zip: "Zip2",
            },
        });
    })
})