import SendEmailWhenProductIsCreatedHandler from "../../product/event/handlers/send_email_when_product_is_created.handler"
import ProductCreatedEvent from "../../product/event/product_created.event"
import EventDispatcher from "./event_dispatcher"

describe("Domain events tests", () => {
    it("should register event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers).toMatchObject({})
    })

    it("should not notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "product 1",
            describe: "Product 1 Description",
            price: 10.0,
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})
