import { Request, Response } from "express";
import { Dvd } from "../../entities/product.entity";
import { AppError, handleError } from "../../errors/appError";
import { IDvdCreate } from "../../interfaces/dvds";

import dvdCreateService from "../../services/dvd/dvdCreate.services";

const dvdCreteController = async (req: Request, res: Response) => {
  try {
    const { dvds } = req.body;
    const authEmail = req.userEmail;
    const arrayTest: any = [];

    for (let dvd of dvds) {
      const newDvd = await dvdCreateService(dvd);
      arrayTest.push(newDvd);
    }

    return res.status(201).send(arrayTest);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdCreteController;
