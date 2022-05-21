import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import CustomerRepository from "../../../infrastructure/customer/respository/customer.repository";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";

describe("integration test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    it("should find a customer", async () => {
        const customerRepo = new CustomerRepository();
        const customer = new Customer("123", "John Doe")
        const address = new Address("street", 1, "zip", "city")
        customer.changeAddress(address)
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
})