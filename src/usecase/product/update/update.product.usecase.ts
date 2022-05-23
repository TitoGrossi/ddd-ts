import ProductRepositoryInterface from "../../../domain/product/repository/product_repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.prodcut.dto";

export default class ProductUpateUseCase {
    private productRepo: ProductRepositoryInterface

    constructor(productRepo: ProductRepositoryInterface) {
        this.productRepo = productRepo
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepo.find(input.id);
        product.changePrice(input.price);
        product.changeName(input.name);

        await this.productRepo.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
