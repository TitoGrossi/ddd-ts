import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value_object/address"
import CustomerUpateUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress("John", new Address("street", 1, "zip", "city"))

const input = {
    id: customer.id,
    name: "Jack",
    address: {
        city: customer.address.city + " updated",
        zip: customer.address.zip + " updated",
        number: 2,
        street: customer.address.street + " updated",
    }
}

const mockRepo = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    };
}

describe("Update customer use case unit tests", () => {
    it("should update a customer", async () => {
        const customerRepo = mockRepo();
        const customerUpdateUseCase = new CustomerUpateUseCase(customerRepo);

        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    })
})
