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

    const savedDvds = await dvds.map((dvd: any) => {
      const test = dvdCreateService(dvd);
      arrayTest.push(test);
      console.log(arrayTest);

      //return await dvdCreateService(dvd);
    });
    console.log("entrou aqui");

    //const createdDvd = await dvdCreateService(dvds[0]);

    return res.status(201).send(arrayTest);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdCreteController;
