import ProductCreateUseCase from "./create.product.usecase"

const input = {
    name: "Chinelo",
    price: 10,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Create product use case unit tests", () => {
    it("should create a product", async () => {
        const productRepo = MockRepository();
        const productCreateUseCase = new ProductCreateUseCase(productRepo);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    })

    it("should throw an error when name is missing", async () => {
        const productRepo = MockRepository();
        const cusomerCreateUseCase = new ProductCreateUseCase(productRepo);

        await expect(cusomerCreateUseCase.execute({ ...input, name: "" })).rejects.toThrow(
            "Name is required"
        );
    })

    it("should throw an error when price is negative", async () => {
        const productRepo = MockRepository();
        const cusomerCreateUseCase = new ProductCreateUseCase(productRepo);

        await expect(cusomerCreateUseCase.execute(
            { ...input, price: -2 }
        )).rejects.toThrow(
            "Price must be greater than or equal to 0"
        );
    })
})