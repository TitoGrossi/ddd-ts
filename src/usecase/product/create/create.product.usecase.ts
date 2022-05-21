import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product_repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class ProductCreateUseCase {
    private productRepo: ProductRepositoryInterface

    constructor(productRepo: ProductRepositoryInterface) {
        this.productRepo = productRepo
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input.name, input.price)

        await this.productRepo.create(product)

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}