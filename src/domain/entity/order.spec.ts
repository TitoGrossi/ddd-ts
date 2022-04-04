import Order from "./order"
import OrderItem from "./order_item"

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        const items = [new OrderItem("123", "item", "p1", 2, 2)]
        expect(() => {
            let order = new Order("", "123", items)
        }).toThrowError("Id is requred")
    })

    it("should throw error when customer id is empty", () => {
        const items = [new OrderItem("123", "item", "p1", 2, 1)]
        expect(() => {
            let order = new Order("123", "", items)
        }).toThrowError("CustomerId is requred")
    })

    it("should throw error when item list is empty", () => {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrowError("At least one item is required")
    })

    it("should get correct total price", () => {
        const items = [
            new OrderItem("1", "item", "p1", 2, 1),
            new OrderItem("2", "item", "p1", 100, 2),
            new OrderItem("3", "item", "p1", 46, 3),
            new OrderItem("4", "item", "p1", 8.7, 2),
        ]
        const order = new Order("123", "123", items)

        expect(order.total()).toBe(2 * 1 + 100 * 2 + 46 * 3 + 8.7 * 2)
    })

    it("should throw error whent quantity is less than or equal to 0", () => {
        expect(() => {
            const orderItem = new OrderItem("123", "item", "p1", 2, 0)
        }).toThrowError("Quantity must be greater than 0")
        expect(() => {
            const orderItem = new OrderItem("123", "item", "p1", 2, -2)
        }).toThrowError("Quantity must be greater than 0")
    })
})