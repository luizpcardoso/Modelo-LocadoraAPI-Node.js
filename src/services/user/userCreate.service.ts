import { IUser, IUserCreate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { Cart } from "../../entities/cart.entity";

import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../errors/appError";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
  authEmail,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const cartRepository = AppDataSource.getRepository(Cart);

  const CreationUser = users.find((user) => user.email === authEmail);
  const cartNewUser = new Cart();
  cartNewUser.paid = false;
  cartNewUser.total = 0;

  cartRepository.create(cartNewUser);
  await cartRepository.save(cartNewUser);

  const newUser: IUser = {
    id: uuidv4(),
    name: name,
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, 10),
    isAdm: false,
    cart: cartNewUser,
  };

  if (CreationUser && CreationUser.isAdm === true && isAdm === true) {
    newUser.isAdm = true;
  }

  if (CreationUser && CreationUser.isAdm === false && isAdm === true) {
    throw new AppError(401, "missing admin permision");
  }

  userRepository.create(newUser);

  await userRepository.save(newUser);

  return newUser;
};

export default userCreateService;
