import { v4 as uuid } from "uuid"
import OrderFactory from "./order.factory"

describe("Order factory unit test", () => {
    it("should create an order", () => {
        const orderProps = {
            customerId: uuid(),
            items: [
                {
                    productId: uuid(),
                    name: "Product 1",
                    quantity: 1,
                    price: 100
                },
            ]
        }

        const order = OrderFactory.create(orderProps.customerId, orderProps.items)

        expect(order.customerId).toBe(orderProps.customerId)
        expect(order.items.length).toBe(1)
        expect(order.items[0].productId).toBe(orderProps.items[0].productId)
        expect(order.items[0].quantity).toBe(orderProps.items[0].quantity)
        expect(order.items[0].price).toBe(orderProps.items[0].price)
    })
})