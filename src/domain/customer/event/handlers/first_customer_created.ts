import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import CustomerCreatedEvent from "../customer_created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(_event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
}
