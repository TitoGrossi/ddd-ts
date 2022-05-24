import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../validators/product.yup.validator";

export default class ProductValidatorFactory {
    create(): ValidatorInterface<Product> {
        return new ProductYupValidator()
    }
}
