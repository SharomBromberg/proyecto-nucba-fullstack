import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { dbConnection } from "../database/config";
import authRoutes from "../routes/auth";
import ordersRoutes from "../routes/orders";
import productsRoutes from "../routes/products";

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;
  productsPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.ordersPath = "/orders";
    this.productsPath = "/products";

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "../../uploads"))
    );
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.productsPath, productsRoutes);
    this.app.use(this.ordersPath, ordersRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor inicializado en puerto", this.port);
    });
  }
}
