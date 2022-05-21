import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("integration test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    it("should find a product", async () => {
        const productRepo = new ProductRepository();
        const product = new Product("123", "Chinelo", 10)
        await productRepo.create(product)

        const useCase = new FindProductUseCase(productRepo)
        const input = {
            id: "123",
        };

        const expectedOut = {
            id: "123",
            name: "Chinelo",
            price: 10
        }

        const out = await useCase.execute(input);

        expect(expectedOut).toEqual(out)
    });
})