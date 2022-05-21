import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value_object/address"
import CustomerModel from "../../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"

describe("Customer repository Test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create new customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Street 1", 13, "Zipcode 1", "city1")
        const customer = new Customer("1", "Customer 1")
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

        expect(customerModel.toJSON()).toStrictEqual({
            "active": true,
            "city": "city1",
            "id": "1",
            "name": "Customer 1",
            "number": 13,
            "rewardPoints": 0,
            "street": "Street 1",
            "zipcode": "Zipcode 1",
        })
    })

    it("should update new customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Street 1", 13, "Zipcode 1", "city1")
        const customer = new Customer("1", "Customer 1")
        customer.changeAddress(address)

        await customerRepository.create(customer)

        customer.changeName("Customer 2")

        await customerRepository.update(customer)
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

        expect(customerModel.toJSON()).toStrictEqual({
            "active": true,
            "city": "city1",
            "id": "1",
            "name": "Customer 2",
            "number": 13,
            "rewardPoints": 0,
            "street": "Street 1",
            "zipcode": "Zipcode 1",
        })

    })

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Street 1", 13, "Zipcode 1", "city1")
        const customer = new Customer("1", "Customer 1")
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const foundCustomer = await customerRepository.find(customer.id)

        expect({
            id: customer.id,
            name: customer.name,
        }).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
        })
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const address1 = new Address("Street 1", 13, "Zipcode 1", "city1")
        const customer1 = new Customer("1", "Customer 1")
        customer1.changeAddress(address1)

        await customerRepository.create(customer1)

        const address2 = new Address("Street 1", 13, "Zipcode 1", "city1")
        const customer2 = new Customer("2", "Customer 2")
        customer2.changeAddress(address2)
        customer1.address = address2

        await customerRepository.create(customer2)

        const allCustomers = await customerRepository.findAll()
        const Customers = [customer1, customer2]

        expect(Customers).toEqual(allCustomers)
    })

    it("should throw error when customer is not found", async () => {
        const customerRepository = new CustomerRepository()

        expect(async () => {
            await customerRepository.find("AAAAAAAAAAA")
        }).rejects.toThrow("Customer not found")
    })
})