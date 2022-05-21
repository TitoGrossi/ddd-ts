import { v4 as uuid } from "uuid"
import EventDispatcher from "../../../@shared/event/event_dispatcher"
import Address from "../../value_object/address"
import CustomerChangedAddressEvent from "../customer_changed_address.event "
import EnviaConsoleLogHandler from "./change_address"

describe("Second customer event handler unit tests", () => {
    it("should notify all event handlers for second event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLogHandler()
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler)

        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        const productCreatedEvent = new CustomerChangedAddressEvent({
            name: "customer 1",
            id: uuid(),
            address: new Address("street 1", 2, "zip code", "city"),
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})
