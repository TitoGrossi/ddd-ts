import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;

const setUpDb = async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
};

setUpDb();
