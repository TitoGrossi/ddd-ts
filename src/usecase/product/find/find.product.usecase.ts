import ProductRepositoryInterface from "../../../domain/product/repository/product_repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepo: ProductRepositoryInterface;

    constructor(productRepo: ProductRepositoryInterface) {
        this.productRepo = productRepo
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepo.find(input.id)
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}
