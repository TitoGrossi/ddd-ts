import Address from "../value_object/address"
import CustomerFactory from "./customer.factory"

describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.address).toBeUndefined()
    })

    it("should create a customer with address", () => {
        const address = new Address("street 1", 1, "zip_code", "city")
        const customer = CustomerFactory.createWithAddress("John", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.address).toBe(address)
    })
})
