import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IDvdCreate } from "../../interfaces/dvds";

import dvdBuyService from "../../services/dvd/dvdBuy.service";

const dvdBuyController = async (req: Request, res: Response) => {
  try {
    const { dvdId } = req.params;
    const { quantity } = req.body;
    const authEmail = req.userEmail;

    const cart = await dvdBuyService({ quantity, dvdId, authEmail });

    return res.status(201).send(cart);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdBuyController;
