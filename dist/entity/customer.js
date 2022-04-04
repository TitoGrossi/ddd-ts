"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._active = true;
        this._id = id;
        this._name = name;
        this.validate();
    }
    validate() {
        if (this._id === "")
            throw new Error("Id is required");
        if (this._name === "")
            throw new Error("Name is required");
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined)
            throw new Error("Cannot activate customer that has no address");
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    get name() {
        return this._name;
    }
    set address(address) {
        this._address = address;
    }
    isActive() {
        return this._active;
    }
}
exports.default = Customer;
