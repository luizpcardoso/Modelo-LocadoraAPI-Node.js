import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import dvdListService from "../../services/dvd/dvdList.service";

const dvdListController = async (req: Request, res: Response) => {
  try {
    const dvds = await dvdListService();

    return res.status(200).send(dvds);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdListController;
