import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../db/sequelize/model/customer.model"
import OrderModel from "../../db/sequelize/model/order.model"
import OrderItemModel from "../../db/sequelize/model/order_item.model"
import ProductModel from "../../db/sequelize/model/product.model"
import OrderRepository from "./order.repository"
import Order from "../../../domain/checkout/entity/order"
import OrderItem from "../../../domain/checkout/entity/order_item"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value_object/address"
import Product from "../../../domain/product/entity/product"
import CustomerRepository from "../../customer/respository/customer.repository"
import ProductRepository from "../../product/repository/product.repository"

describe("Order repository Test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel, ProductModel, OrderItemModel, OrderModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.id,
            product.name,
            product.price,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.id,
            product.name,
            product.price,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const addedOrderItem = new OrderItem(
            "2",
            product.id,
            product.name,
            product.price,
            1
        );
        order.items.push(addedOrderItem)

        await orderRepository.update(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
                {
                    id: addedOrderItem.id,
                    name: addedOrderItem.name,
                    price: addedOrderItem.price,
                    quantity: addedOrderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    })


    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.id,
            product.name,
            product.price,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundModel = await orderRepository.find(order.id);

        expect(foundModel).toEqual({
            _id: "123",
            _customerId: "123",
            _items: [
                {
                    _id: "1",
                    _name: "Product 1",
                    _price: 20,
                    _productId: "123",
                    _quantity: 2,
                },
            ],
        });
    })

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        for (let i = 1; i < 3; i++) {
            const customer = new Customer(`${i}`, `Customer ${i}`);
            const address = new Address(`Street ${i}`, 1, `Zipcode ${i}`, `City ${i}`);
            customer.changeAddress(address);
            await customerRepository.create(customer);

            const product = new Product(`${i}`, `Product ${i}`, i * 10);
            await productRepository.create(product);

            const orderItem = new OrderItem(
                `${i}`,
                product.id,
                product.name,
                product.price,
                i
            );

            const order = new Order(`${i}`, customer.id, [orderItem]);

            await orderRepository.create(order);
        }

        const foundModels = await orderRepository.findAll();

        expect(foundModels).toEqual([
            {
                _id: "1",
                _customerId: "1",
                _items: [
                    {
                        _id: "1",
                        _name: "Product 1",
                        _price: 10,
                        _productId: "1",
                        _quantity: 1,
                    },
                ],
            },
            {
                _id: "2",
                _customerId: "2",
                _items: [
                    {
                        _id: "2",
                        _name: "Product 2",
                        _price: 20 * 2,
                        _productId: "2",
                        _quantity: 2,
                    },
                ],
            },
        ])
    })
})