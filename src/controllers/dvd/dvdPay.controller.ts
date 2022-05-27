import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

import dvdPayService from "../../services/dvd/dvdPay.service";

const dvdPayController = async (req: Request, res: Response) => {
  try {
    const authEmail = req.userEmail;

    const cartCheckout = await dvdPayService({ authEmail });

    return res.status(200).send(cartCheckout);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdPayController;
