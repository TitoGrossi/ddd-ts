import Address from "../../../domain/customer/value_object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository.interface";
import CustomerModel from "../../db/sequelize/model/customer.model";


export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            },
            {
                where: {
                    id: entity.id,
                },
            }
        );
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );
        const customer = new Customer(id, customerModel.name)
        customer.changeAddress(address)
        return customer

    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map((customerModel) => {
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            );
            let customer = new Customer(customerModel.id, customerModel.name);
            customer.changeAddress(address)
            customer.addRewardPoints(customerModel.rewardPoints);

            return customer;
        });
    }
}
