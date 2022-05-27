import { Router } from "express";

import dvdCreteController from "../controllers/dvd/dvdCreate.controller";
import dvdListController from "../controllers/dvd/dvdList.controller";
import dvdBuyController from "../controllers/dvd/dvdBuy.controller";
import dvdPayController from "../controllers/dvd/dvdPay.controller";

import { authUser } from "../middlewares/authUser.middleware";

const routes = Router();

export const dvdRoutes: any = () => {
  routes.post("/dvds/register", authUser, dvdCreteController);
  routes.get("/dvds", dvdListController);
  routes.post("/dvds/buy/:dvdId", authUser, dvdBuyController);
  routes.put("/carts/pay", authUser, dvdPayController);

  return routes;
};
export default dvdRoutes;
