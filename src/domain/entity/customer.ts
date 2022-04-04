// Entidade anêmica
// DTO -> Data Transfer Object (transferir dados entre camadas)
import Address from "./address"


export default class Customer {
    private _id: string
    private _name: string
    private _address: Address | null
    private _active: boolean = true
    private _rewardPoints: number = 0

    constructor(id: string, name: string, address: Address = null) {
        this._id = id
        this._name = name
        this._address = address
        this.validate()
    }

    validate() {
        if (this._id === "")
            throw new Error("Id is required")
        if (this._name === "")
            throw new Error("Name is required")
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    activate() {
        if (this._address === null)
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