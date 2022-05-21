import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository.interface";
import Address from "../../../domain/customer/value_object/address";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class CustomerListUpateUseCase {
    private _customerRepo: CustomerRepositoryInterface

    constructor(customerRepo: CustomerRepositoryInterface) {
        this._customerRepo = customerRepo
    }

    async execute(_: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this._customerRepo.findAll();

        return {
            customers: customers.map((customer) => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city,
                    }
                };
            })
        };
    }
}
