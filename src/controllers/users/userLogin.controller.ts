import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userLoginService from "../../services/user/UserLogin.service";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await userLoginService({ email, password });

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userLoginController;
