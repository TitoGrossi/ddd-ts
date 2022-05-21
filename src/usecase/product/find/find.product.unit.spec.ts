import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("chinelo", 10)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test find product use case", () => {
    it("should find a product", async () => {
        const productRepo = MockRepository();

        const useCase = new FindProductUseCase(productRepo)
        const input = {
            id: "123",
        };

        const expectedOut = {
            id: product.id,
            name: product.name,
            price: 10
        }

        const out = await useCase.execute(input);

        expect(expectedOut).toEqual(out)
    });

    it("should not find a product", async () => {
        const productRepo = MockRepository();
        productRepo.find.mockImplementation(() => {
            throw Error("Product not found")
        })
        await productRepo.create(product)

        const useCase = new FindProductUseCase(productRepo)
        const input = {
            id: "123",
        };

        expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow("Product not found")
    })
})