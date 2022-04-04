"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(street, number, zip, city) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
    }
    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
    }
}
exports.default = Address;
