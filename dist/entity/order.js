"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, _customerId, items) {
        this._id = id;
        this._customerId = _customerId;
        this._items = items;
        this.validate();
    }
    validate() {
        if (this._id.length === 0)
            throw new Error("Id is requred");
        if (this._customerId.length === 0)
            throw new Error("CustomerId is requred");
        if (this._items.length === 0)
            throw new Error("At least one item is required");
    }
    total() {
        return this._items.reduce((acc, curr) => acc + curr.price, 0);
    }
}
exports.default = Order;
