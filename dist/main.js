"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./entity/address"));
const customer_1 = __importDefault(require("./entity/customer"));
const order_1 = __importDefault(require("./entity/order"));
const order_item_1 = __importDefault(require("./entity/order_item"));
// ============ Customer Aggregate ============
let customer = new customer_1.default("123", "Jose Bonifacio");
const address = new address_1.default("Rua dois", 2, "1312-1234", "São Paulo");
customer.address = address;
customer.activate();
// =========================================
// ============ Order Aggregate ============
const item1 = new order_item_1.default("1", "1", "Bola", 10, 1);
const item2 = new order_item_1.default("2", "2", "Sapato", 15, 1);
const order = new order_1.default("1", "123", [item1, item2]);
// =========================================
