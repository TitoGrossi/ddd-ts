import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            indent: "    ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML({
            customers: data.customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: customer.address,
                }
            })
        }, xmlOptions)
    }
}
