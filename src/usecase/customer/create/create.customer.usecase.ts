import { v4 as uuid } from "uuid";

import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository.interface";
import Address from "../../../domain/customer/value_object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CustomerCreateUseCase {
    private customerRepo: CustomerRepositoryInterface

    constructor(customerRepo: CustomerRepositoryInterface) {
        this.customerRepo = customerRepo
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city,
            ),
        )

        await this.customerRepo.create(customer)

        return {
            id: customer.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        }
    }
}