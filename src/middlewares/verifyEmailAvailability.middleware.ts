import { User } from "../entities/user.entity";

import { AppDataSource } from "../data-source";

import { Request, Response, NextFunction } from "express";

const verifyEmailAvailabilityMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const { email } = req.body;

  const userAlreadyExist = users.find((user) => user.email === email);

  if (userAlreadyExist) {
    return res
      .status(409)
      .json({ message: `Key email=${email} already exists.` });
  }

  next();
};

export default verifyEmailAvailabilityMiddlewere;
