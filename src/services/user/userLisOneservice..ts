import { User } from "../../entities/user.entity";
import { IUserListOne } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";

const userListOneService = async ({ id }: IUserListOne) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((user) => user.id == id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export default userListOneService;
