import ProductRepositoryInterface from "../../../domain/product/repository/product_repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ProductListUpateUseCase {
    private productRepo: ProductRepositoryInterface

    constructor(productRepo: ProductRepositoryInterface) {
        this.productRepo = productRepo
    }

    async execute(_: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepo.findAll();

        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            })
        }
    }
}
