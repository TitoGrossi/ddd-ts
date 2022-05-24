import express, { Request, Response } from "express";
import CustomerCreateUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerListUpateUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/respository/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CustomerCreateUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            },
        };

        const output = await useCase.execute(customerDto);
        res.status(201).send(output)
    } catch (err) {
        res.status(400).send(err)
    }
});

customerRoute.get("/", async (_: Request, res: Response) => {
    const useCase = new CustomerListUpateUseCase(new CustomerRepository());
    try {
        const customerDto = {};
        const output = await useCase.execute(customerDto);

        res.format({
            json: async () => res.status(200).send(output),
            xml: async () => res.status(200).send(CustomerPresenter.listXML(output)),
        })

    } catch (err) {
        res.status(400).send(err)
    }
});
