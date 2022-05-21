import CustomerChangedAddressEvent from "../customer_changed_address.event ";

export default class EnviaConsoleLogHandler {
    handle(event: CustomerChangedAddressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`)
    }
}
