import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("Order service unit tests", () => {
    it("should get sum of orders total prices", () => {
        const item1 = new OrderItem("1", "product1", "tenis", 5, 3)
        const item2 = new OrderItem("1", "product2", "bermuda", 10, 2)

        const order1 = new Order("order1", "customer1", [item1])
        const order2 = new Order("order2", "customer2", [item2])

        const orders = [order1, order2]

        const total = OrderService.total(orders)

        expect(total).toBe(35)
    })

    it("should place an order", () => {
        const customer = new Customer("c1", "customer1")
        const item1 = new OrderItem("i1", "order1", "tenis", 10, 1)

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)
    })
})
