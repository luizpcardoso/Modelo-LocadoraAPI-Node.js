import { Router } from "express";

const routes = Router();

import userCreteController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/UserDelete.controller";
import userListController from "../controllers/users/userList.controller";
import userListOneController from "../controllers/users/userListOne.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import { authUser } from "../middlewares/authUser.middleware";

import verifyEmailAvailabilityMiddlewere from "../middlewares/verifyEmailAvailability.middleware";
import verifyAdmin from "../middlewares/VerifyAdmin.middleware";
import verifyFieldsRegisterMiddlewere from "../middlewares/verifyFields";

export const userRoutes: any = () => {
  routes.post(
    "/users",
    verifyEmailAvailabilityMiddlewere,
    verifyFieldsRegisterMiddlewere,
    verifyAdmin,
    userCreteController
  );
  routes.get("/users", authUser, userListController);
  routes.post("/users/login", userLoginController);
  routes.get("/users/:id", authUser, userListOneController);
  routes.delete("/users/:id", authUser, userDeleteController);
  routes.patch("/users/:id", authUser, userUpdateController);

  return routes;
};
export default userRoutes;
