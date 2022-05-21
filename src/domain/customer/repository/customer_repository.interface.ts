import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/respository/repository_interface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<Customer> { }