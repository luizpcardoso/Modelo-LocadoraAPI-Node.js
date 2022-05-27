import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { User } from "../../entities/user.entity";
import IDvdPay from "../../interfaces/dvds";

const dvdPayService = async ({ authEmail }: IDvdPay) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const user = users.find((user) => user.email === authEmail);

  if (!user) {
    throw new AppError(400, "User not found");
  }

  user.cart.paid = true;

  await userRepository.save(user);

  return user.cart;
};

export default dvdPayService;
