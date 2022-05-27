import { IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";

const updateUserService = async ({
  name,
  email,
  password,
  isAdm,
  id,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userToUpdate = users.find((element) => element.id === id);
  if (!userToUpdate) {
    throw new Error("User not found");
  }

  const userUpdatedvalues = {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  };
  const keys = Object.keys(userUpdatedvalues);

  const newUserData = Object.assign(userToUpdate, userUpdatedvalues);

  for (let key in userUpdatedvalues) {
    if (key != undefined) {
      userToUpdate[key as keyof typeof userUpdatedvalues] =
        userUpdatedvalues[key as keyof typeof userUpdatedvalues];
    }
  }

  await userRepository.update(userToUpdate!.id, userToUpdate);

  delete userToUpdate.password;

  return userToUpdate;
};

export default updateUserService;
