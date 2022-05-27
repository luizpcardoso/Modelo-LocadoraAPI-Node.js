import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

export const userDeleteSelfService = async (id: any) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userDelete = users.find((user) => user.id === id);

  if (!userDelete) {
    throw new Error("User not found");
  }

  await userRepository.delete(userDelete);

  return true;
};
