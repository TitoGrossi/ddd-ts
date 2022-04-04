import Address from "./domain/entity/address"
import Customer from "./domain/entity/customer"
import Order from "./domain/entity/order"
import OrderItem from "./domain/entity/order_item"



// ============ Customer Aggregate ============
let customer = new Customer("123", "Jose Bonifacio")
const address = new Address("Rua dois", 2, "1312-1234", "São Paulo")

customer.address = address
customer.activate()
// =========================================


// ============ Order Aggregate ============
const item1 = new OrderItem("1", "1", "Bola", 10, 1)
const item2 = new OrderItem("2", "2", "Sapato", 15, 1)

const order = new Order("1", "123", [item1, item2])
// =========================================
