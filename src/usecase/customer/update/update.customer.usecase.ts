import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository.interface";
import Address from "../../../domain/customer/value_object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class CustomerUpateUseCase {
    private _customerRepo: CustomerRepositoryInterface

    constructor(customerRepo: CustomerRepositoryInterface) {
        this._customerRepo = customerRepo
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this._customerRepo.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ));

        await this._customerRepo.update(customer);

        return input;
    }
}
