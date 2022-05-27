import { Request, Response, NextFunction } from "express";

const verifyFieldsRegisterMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    const error = [];

    if (!email) {
      error.push("email is a required field");
    }
    if (!name) {
      error.push("name is a required field");
    }
    if (!password) {
      error.push("password is a required field");
    }

    return res.status(400).json({ error: error });
  }

  next();
};

export default verifyFieldsRegisterMiddlewere;
