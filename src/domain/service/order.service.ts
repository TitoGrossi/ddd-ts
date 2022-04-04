import { v4 as uuidv4 } from "uuid";

import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
    // Isso é um service porque aplica uma operação em várias orders de uma só vez.
    // No entanto, nao faz muito sentido trazer coisas do banco para a memoria so pra fazer essa operação.
    // Por isso, esse método está aqui somente por didática.
    // Às vezes vale a pena definir isso, mas receber um datasource pra dar loop (metodo do banco, etc.)
    // Nota sobre isso: puritanismo de DDD não é bom
    static total(orders: Order[]): number {
        return orders.reduce((acc, curr) => acc + curr.total(), 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Orders must have at least one item")
        }

        const order = new Order(uuidv4(), customer.id, items)
        customer.addRewardPoints(order.total() / 2)
        return order
    }
}
