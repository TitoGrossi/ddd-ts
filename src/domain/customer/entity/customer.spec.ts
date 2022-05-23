import Address from "../value_object/address"
import Customer from "./customer"

describe("Customer unit tests", () => {
    it("notification should get error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John")
        }).toThrowError("customer: Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("customer: Name is required")
    })

    it("notification should get error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John")
        }).toThrowError("customer: Id is required")
    })

    it("should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Customer("", "")
        }).toThrowError("customer: Id is required, customer: Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("123", "John")
        customer.changeName("James")

        expect(customer.name === "James")
    })

    it("should activate customer", () => {
        const customer = new Customer("123", "John")
        const address = new Address("Rua", 2, "skla.fjsl", "Sao Paulo")
        customer.address = address
        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it("should throw error when activate customer with no address", () => {
        const customer = new Customer("123", "John")
        expect(() => {
            customer.activate()
        }).toThrowError("Cannot activate customer that has no address")
    })

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John")
        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it("should add reward points", () => {
        const customer = new Customer("id1", "customer1")
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })
})