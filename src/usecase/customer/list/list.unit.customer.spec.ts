import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value_object/address"
import CustomerListUpateUseCase from "./list.customer.usecase"

const customer1 = CustomerFactory.createWithAddress("John", new Address("street", 1, "zip", "city"))
const customer2 = CustomerFactory.createWithAddress("Jane", new Address("street2", 2, "zip2", "city2"))

const input = {}

const mockRepo = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue([customer1, customer2]),
        update: jest.fn(),
        find: jest.fn(),
    };
}

describe("List customer use case unit tests", () => {
    it("should retrieve all customers", async () => {
        const customerRepo = mockRepo();
        const customerUpdateUseCase = new CustomerListUpateUseCase(customerRepo);

        const output = await customerUpdateUseCase.execute(input)

        expect(output).toEqual({
            customers: [
                {
                    name: customer1.name,
                    id: customer1.id,
                    address: {
                        street: customer1.address.street,
                        number: customer1.address.number,
                        zip: customer1.address.zip,
                        city: customer1.address.city,
                    }
                },
                {
                    name: customer2.name,
                    id: customer2.id,
                    address: {
                        street: customer2.address.street,
                        number: customer2.address.number,
                        zip: customer2.address.zip,
                        city: customer2.address.city,
                    }
                },
            ]
        })
    })
})
