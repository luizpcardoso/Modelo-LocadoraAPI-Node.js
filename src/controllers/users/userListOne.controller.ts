import { Request, Response } from "express";
import userListOneService from "../../services/user/userLisOneservice.";

const userListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userListOneService({ id });

    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userListOneController;
