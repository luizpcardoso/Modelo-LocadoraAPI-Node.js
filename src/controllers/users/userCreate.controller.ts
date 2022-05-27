import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";

const userCreteController = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdm, password } = req.body;

    const authEmail = req.userEmail;

    const newUser = await userCreateService({
      name,
      email,
      isAdm,
      password,
      authEmail,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userCreteController;
