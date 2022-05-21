import CustomerCreateUseCase from "./create.customer.usecase"

const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
    },
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Create customer use case unit tests", () => {
    it("should create a customer", async () => {
        const customerRepo = MockRepository();
        const cusomerCreateUseCase = new CustomerCreateUseCase(customerRepo);

        const output = await cusomerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                city: input.address.city,
                zip: input.address.zip,
                number: input.address.number,
                street: input.address.street,
            },
        });
    })

    it("should throw an error when name is missing", async () => {
        const customerRepo = MockRepository();
        const cusomerCreateUseCase = new CustomerCreateUseCase(customerRepo);

        await expect(cusomerCreateUseCase.execute({ ...input, name: "" })).rejects.toThrow(
            "Name is required"
        );
    })

    it("should throw an error when street is missing", async () => {
        const customerRepo = MockRepository();
        const cusomerCreateUseCase = new CustomerCreateUseCase(customerRepo);

        await expect(cusomerCreateUseCase.execute(
            { ...input, address: { ...input.address, street: "" } }
        )).rejects.toThrow(
            "Street is required"
        );
    })
})