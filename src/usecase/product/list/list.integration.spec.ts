import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductListUpateUseCase from "./list.product.usecase";

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

    it("should list all products", async () => {
        const productRepo = new ProductRepository();
        const product = new Product("123", "Chinelo", 10)
        await productRepo.create(product)

        const product2 = new Product("124", "Tenis", 50)
        await productRepo.create(product2)

        const useCase = new ProductListUpateUseCase(productRepo)
        const input = {};

        const out = await useCase.execute(input);

        const expectedOut = {
            products: [
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price,
                },
            ]
        }

        expect(expectedOut).toEqual(out)
    });
})
