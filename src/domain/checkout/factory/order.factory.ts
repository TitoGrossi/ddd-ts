import { v4 as uuid } from "uuid";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface CreateOrderItemProps {
    productId: string,
    name: string,
    quantity: number,
    price: number,
}

export default class OrderFactory {
    public static create(customerId: string, items: CreateOrderItemProps[]): Order {
        const orderItems = items.map(item => new OrderItem(
            uuid(),
            item.productId,
            item.name,
            item.price,
            item.quantity
        ))
        return new Order(uuid(), customerId, orderItems)
    }
}