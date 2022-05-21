import Order from "../../../domain/checkout/entity/order"
import OrderItem from "../../../domain/checkout/entity/order_item"
import OrderRepositoryInterface from "../../../domain/checkout/repository/order_repository.interface"
import OrderModel from "../../db/sequelize/model/order.model"
import OrderItemModel from "../../db/sequelize/model/order_item.model"


export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    order_id: entity.id,
                    product_id: item.productId
                }
            })
        },
            {
                include: [{ model: OrderItemModel }]
            }
        )
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                cutomer_id: entity.customerId,
                total: entity.total(),
                items: entity.items,
            },
            {
                where: {
                    id: entity.id
                },
            }
        )
        const affectedOrder = await OrderModel.findByPk(entity.id, { include: ["items"] })
        OrderItemModel.bulkCreate(entity.items.filter(
            item => !affectedOrder.items.map(i => i.id).includes(item.id)
        ).map(item => {
            return {
                id: item.id,
                product_id: item.productId,
                order_id: entity.id,
                quantity: item.quantity,
                name: item.name,
                price: item.price
            }
        }))
    }

    async find(id: string): Promise<Order> {
        let orderModel: OrderModel
        try {
            orderModel = await OrderModel.findOne({
                where: { id: id },
                rejectOnEmpty: true,
                include: ["items"]
            })
        }
        catch (error) {
            throw new Error("Customer not found")
        }

        return new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map(item => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity)),
        )
    }

    async findAll(): Promise<Order[]> {
        let ordersModel: OrderModel[]
        try {
            ordersModel = await OrderModel.findAll({
                include: ["items"]
            })
        }
        catch (error) {
            throw new Error("Customer not found")
        }

        return ordersModel.map((orderModel) => new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map(item => new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            ))
        ))
    }
}