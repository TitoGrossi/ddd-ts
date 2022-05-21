import express, { Request, Response } from "express";
import ProductCreateUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductListUpateUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new ProductCreateUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price
        };

        const output = await useCase.execute(productDto);
        res.status(201).send(output)
    } catch (err) {
        res.status(400).send(err)
    }
});

productRoute.get("/", async (_: Request, res: Response) => {
    const useCase = new ProductListUpateUseCase(new ProductRepository());
    try {
        const customerDto = {};
        const output = await useCase.execute(customerDto);

        res.status(200).send(output)
    } catch (err) {
        res.status(400).send(err)
    }
});
