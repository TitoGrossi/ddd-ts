import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default interface CustomerValidatorFactoryInterface {
    create(): ValidatorInterface<Customer>
}
