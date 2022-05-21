import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductListUpateUseCase from "./list.product.usecase"

const product1 = ProductFactory.create("Camisa", 10)
const product2 = ProductFactory.create("Camisa", 50)

const input = {}

const mockRepo = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue([product1, product2]),
        update: jest.fn(),
        find: jest.fn(),
    };
}

describe("List product use case unit tests", () => {
    it("should retrieve all products", async () => {
        const productRepo = mockRepo();
        const productUpdateUseCase = new ProductListUpateUseCase(productRepo);

        const output = await productUpdateUseCase.execute(input)

        expect(output).toEqual({
            products: [
                {
                    name: product1.name,
                    id: product1.id,
                    price: product1.price
                },
                {
                    name: product2.name,
                    id: product2.id,
                    price: product2.price
                },
            ]
        })
    })
})
