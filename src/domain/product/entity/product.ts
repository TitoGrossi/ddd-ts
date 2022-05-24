import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import ProductValidatorFactory from "../factory/product.validator.factory"
import ProductInterface from "./product.interface"

export default class Product extends Entity implements ProductInterface {
    private _name: string
    private _price: number
    private _orderItemId: string = ""

    constructor(id: string, name: string, price: number) {
        super(id)
        this._name = name
        this._price = price

        this.validate()
    }

    validate() {
        new ProductValidatorFactory().create().validate(this)
        if (this.notification.hasErrors())
            throw new NotificationError(this.notification.errors)
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }

    get name() {
        return this._name
    }

    get price() {
        return this._price
    }

    get id() {
        return this._id
    }
}
