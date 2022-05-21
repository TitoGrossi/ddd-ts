import Order from "./domain/checkout/entity/order"
import OrderItem from "./domain/checkout/entity/order_item"
import Address from "./domain/customer/value_object/address"
import Customer from "./domain/customer/entity/customer"



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
