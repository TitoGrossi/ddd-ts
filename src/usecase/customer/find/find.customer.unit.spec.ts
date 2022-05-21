import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("123", "John Doe")
const address = new Address("street", 1, "zip", "city")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepo = MockRepository();
        await customerRepo.create(customer)

        const useCase = new FindCustomerUseCase(customerRepo)
        const input = {
            id: "123",
        };

        const expectedOut = {
            id: "123",
            name: "John Doe",
            address: {
                street: "street",
                number: 1,
                city: "city",
                zip: "zip",
            },
        }

        const out = await useCase.execute(input);

        expect(expectedOut).toEqual(out)
    });

    it("should not find a customer", async () => {
        const customerRepo = MockRepository();
        customerRepo.find.mockImplementation(() => {
            throw Error("Customer not found")
        })
        await customerRepo.create(customer)

        const useCase = new FindCustomerUseCase(customerRepo)
        const input = {
            id: "123",
        };

        expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow("Customer not found")
    })
})