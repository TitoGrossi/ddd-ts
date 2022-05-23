import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductCreateUseCase from "./create.product.usecase";

describe("integration test create product use case", () => {
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

    it("should create a product", async () => {
        const productRepo = new ProductRepository();
        const product = new Product("123", "Chinelo", 10)
        await productRepo.create(product)

        const useCase = new ProductCreateUseCase(productRepo)
        const input = {
            name: "Chinelo",
            price: 10

        };

        const out = await useCase.execute(input);

        const expectedOut = {
            id: out.id,
            name: input.name,
            price: input.price,
        }

        expect(expectedOut).toEqual(out)
    });
})
