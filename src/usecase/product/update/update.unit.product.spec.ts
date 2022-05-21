import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductUpateUseCase from "./update.product.usecase"

const product = ProductFactory.create("Chinelo", 10)

const input = {
    id: product.id,
    name: "Camisa",
    price: 50,
}

const mockRepo = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
}

describe("Update product use case unit tests", () => {
    it("should update a product", async () => {
        const productRepo = mockRepo();
        const productUseCase = new ProductUpateUseCase(productRepo);

        const output = await productUseCase.execute(input)

        expect(output).toEqual(input)
    })
})
