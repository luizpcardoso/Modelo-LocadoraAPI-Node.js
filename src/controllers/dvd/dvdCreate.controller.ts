import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IDvdCreate } from "../../interfaces/dvds";

import dvdCreateService from "../../services/dvd/dvdCreate.services";

const dvdCreteController = async (req: Request, res: Response) => {
  try {
    const { dvds } = req.body.dvds;
    const authEmail = req.userEmail;
    const createdDvd = await dvdCreateService(dvds[0]);

    return res.status(201).send(createdDvd);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdCreteController;
