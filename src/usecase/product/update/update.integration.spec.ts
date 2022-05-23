import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductUpateUseCase from "./update.product.usecase";

describe("integration test list product use case", () => {
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

    it("should update specified product", async () => {
        const productRepo = new ProductRepository();
        const product = new Product("123", "Chinelo", 10)
        await productRepo.create(product)

        // Garantir que o update esta sendo feito no record correto
        const product2 = new Product("124", "Tenis", 50)
        await productRepo.create(product2)

        const useCase = new ProductUpateUseCase(productRepo)
        const input = {
            id: "123",
            name: "Melancia",
            price: 5,
        };

        const out = await useCase.execute(input);

        const expectedOut = {
            id: product.id,
            name: input.name,
            price: input.price,
        };

        expect(expectedOut).toEqual(out)
    });
})
