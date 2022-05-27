import { Request, Response } from "express";
import updateUserService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;
    const { id } = req.params;

    const user = await updateUserService({ name, email, password, isAdm, id });

    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userUpdateController;
