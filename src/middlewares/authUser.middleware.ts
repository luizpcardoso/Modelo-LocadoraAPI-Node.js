import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("missing authorization token");
    }

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (error: any, decoded: any) => {
        if (error) {
          return res.status(401).json({ message: "Invalid Token." });
        }
        req.userEmail = decoded.email;

        next();
      }
    );
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
