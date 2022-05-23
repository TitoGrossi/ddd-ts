// Entidade anêmica
// DTO -> Data Transfer Object (transferir dados entre camadas)
import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import CustomerYupValidatorFactory from "../validator/customer.yup.validator"
import Address from "../value_object/address"


export default class Customer extends Entity {
    private _name: string
    private _address!: Address
    private _active: boolean = true
    private _rewardPoints: number = 0

    constructor(id: string, name: string) {
        super(id);
        this._name = name
        this.validate()
    }

    validate() {
        new CustomerYupValidatorFactory().validate(this)

        if (this.notification.hasErrors())
            throw new NotificationError(this.notification.errors)
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    activate() {
        if (this._address === undefined)
            throw new Error("Cannot activate customer that has no address")
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(quantity: number): void {
        this._rewardPoints += quantity
    }

    changeAddress(address: Address): void {
        this._address = address
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    set address(address: Address) {
        this._address = address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    get address(): Address {
        return this._address
    }

    isActive(): boolean {
        return this._active
    }
}