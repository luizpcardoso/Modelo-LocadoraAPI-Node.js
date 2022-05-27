import { Request, Response } from "express";
import { userDeleteSelfService } from "../../services/user/userRemove.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userDeleteSelfService(id);
    return res.status(200).json({ message: "User deleted witch sucess!" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userDeleteController;
