import { Express } from "express";
import userRoutes from "./userRoutes";
import dvdRoutes from "./dvdRoutes";

export const appRoutes = (app: Express) => {
  app.use("/api", userRoutes());
  app.use("/api", dvdRoutes());
  // app.use('/cart', cartRoutes())
};
