import EventDispatcher from "../../../@shared/event/event_dispatcher"
import CustomerCreatedEvent from "../customer_created.event"
import EnviaConsoleLog1Handler from "./first_customer_created"
import EnviaConsoleLog2Handler from "./second_customer_created"


describe("First customer event handler unit tests", () => {
    it("should register event handler for first event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog1Handler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler for first event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog1Handler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0)
    })

    it("should unregister all events for first event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog1Handler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)
        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers).toMatchObject({})
    })

    it("should notify all event handlers for first event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog1Handler()
        eventDispatcher.register("CustomerCreatedEvent", eventHandler)

        const spyEventHandler = jest.spyOn(eventHandler, "handle")


        const productCreatedEvent = new CustomerCreatedEvent({
            name: "product 1",
            describe: "Product 1 Description",
            price: 10.0,
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})


describe("Second customer event handler unit tests", () => {
    it("should register event handler for second event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog2Handler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler for second event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog2Handler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0)
    })

    it("should unregister all events for second event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog2Handler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler)
        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers).toMatchObject({})
    })

    it("should notify all event handlers for second event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLog2Handler()
        eventDispatcher.register("CustomerCreatedEvent", eventHandler)

        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        const productCreatedEvent = new CustomerCreatedEvent({
            name: "product 1",
            describe: "Product 1 Description",
            price: 10.0,
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})
