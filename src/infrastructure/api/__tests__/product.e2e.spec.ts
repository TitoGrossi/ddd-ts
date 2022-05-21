import { app, sequelize } from "../express";
import request from "supertest";
import ProductModel from "../../db/sequelize/model/product.model";

describe("E2E tests for product", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await ProductModel.destroy({ where: {}, truncate: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Chinelo",
            price: 10
        })

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Chinelo");
        expect(response.body.price).toBe(10);
    })

    it("should not create a product and should return an error", async () => {
        const response = await request(app).post("/product").send({
            name: "Chinelo",
        })
        expect(response.statusCode).toBe(400);
    })

    it("should retrieve all products", async () => {
        for (let i = 1; i < 3; i++) {
            await request(app).post("/product").send({
                name: `Chinelo${i}`,
                price: i * 10
            })
        }

        const response = await request(app).get("/product").send()

        expect(response.statusCode).toBe(200);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0]).toEqual({
            id: response.body.products[0].id,
            name: "Chinelo1",
            price: 10
        });
        expect(response.body.products[1]).toEqual({
            id: response.body.products[1].id,
            name: "Chinelo2",
            price: 20
        });
    })
})