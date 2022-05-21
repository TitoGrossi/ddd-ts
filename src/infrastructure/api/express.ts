import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute)
app.use("/product", productRoute)

export let sequelize: Sequelize;

const setUpDb = async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    })
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync()
};

setUpDb();
