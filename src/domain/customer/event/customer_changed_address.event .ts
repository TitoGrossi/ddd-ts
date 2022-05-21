import EventInterface from "../../@shared/event/event.interface"
import Customer from "../entity/customer"

export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOcurred: Date
    eventData: Customer

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date()
        this.eventData = eventData
    }
}
