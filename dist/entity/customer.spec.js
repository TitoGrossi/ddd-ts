"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it("should change name", () => {
        const customer = new customer_1.default("123", "John");
        customer.changeName("James");
        expect(customer.name === "James");
    });
    it("should activate customer", () => {
        const customer = new customer_1.default("123", "John");
        const address = new address_1.default("Rua", 2, "skla.fjsl", "Sao Paulo");
        customer.address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should throw error when activate customer with no address", () => {
        const customer = new customer_1.default("123", "John");
        expect(() => {
            customer.activate();
        }).toThrowError("Cannot activate customer that has no address");
    });
    it("should deactivate customer", () => {
        const customer = new customer_1.default("123", "John");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
});
