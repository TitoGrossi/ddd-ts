import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private customerRepo: CustomerRepositoryInterface;

    constructor(customerRepo: CustomerRepositoryInterface) {
        this.customerRepo = customerRepo
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepo.find(input.id)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                zip: customer.address.zip,
                number: customer.address.number,
            },
        };
    }
}