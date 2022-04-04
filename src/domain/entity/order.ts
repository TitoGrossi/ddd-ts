import OrderItem from "./order_item"

export default class Order {
    private _id: string
    private _customerId: string
    private _orderId: string
    private _items: OrderItem[]

    constructor(id: string, _customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = _customerId
        this._items = items
        this.validate()
    }

    validate() {
        if (this._id.length === 0)
            throw new Error("Id is requred")
        if (this._customerId.length === 0)
            throw new Error("CustomerId is requred")
        if (this._items.length === 0)
            throw new Error("At least one item is required")
    }

    total(): number {
        return this._items.reduce((acc, curr) => acc + curr.price, 0)
    }

    get id(): string {
        return this._id
    }

    get customerId(): string {
        return this._customerId
    }

    get items(): OrderItem[] {
        return this._items
    }
}