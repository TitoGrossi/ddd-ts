"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        const items = [new order_item_1.default("123", "item", "p1", 2, 2)];
        expect(() => {
            let order = new order_1.default("", "123", items);
        }).toThrowError("Id is requred");
    });
    it("should throw error when customer id is empty", () => {
        const items = [new order_item_1.default("123", "item", "p1", 2, 1)];
        expect(() => {
            let order = new order_1.default("123", "", items);
        }).toThrowError("CustomerId is requred");
    });
    it("should throw error when item list is empty", () => {
        expect(() => {
            let order = new order_1.default("123", "123", []);
        }).toThrowError("At least one item is required");
    });
    it("should get correct total price", () => {
        const items = [
            new order_item_1.default("1", "item", "p1", 2, 1),
            new order_item_1.default("2", "item", "p1", 100, 2),
            new order_item_1.default("3", "item", "p1", 46, 3),
            new order_item_1.default("4", "item", "p1", 8.7, 2),
        ];
        const order = new order_1.default("123", "123", items);
        expect(order.total()).toBe(2 * 1 + 100 * 2 + 46 * 3 + 8.7 * 2);
    });
    it("should throw error whent quantity is less than or equal to 0", () => {
        expect(() => {
            const orderItem = new order_item_1.default("123", "item", "p1", 2, 0);
        }).toThrowError("Quantity must be greater than 0");
        expect(() => {
            const orderItem = new order_item_1.default("123", "item", "p1", 2, -2);
        }).toThrowError("Quantity must be greater than 0");
    });
});
