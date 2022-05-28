import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";
import { IDvdCreate } from "../../interfaces/dvds";
import { Stock } from "../../entities/stock.entity";
import { json } from "express";

const dvdCreateService = async ({
  name,
  duration,
  quantity,
  price,
}: IDvdCreate) => {
  const productRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);

  const productAlreadyExist = await productRepository.findOne({
    where: { name },
  });

  if (productAlreadyExist) {
    throw new AppError(409, "This dvd already exists");
  }

  const product = new Dvd();
  const productStock = new Stock();

  productStock.price = price;
  productStock.quantity = quantity;

  stockRepository.create(productStock);
  await stockRepository.save(productStock);

  product.name = name;
  product.duration = duration;
  product.stock = productStock;

  productRepository.create(product);
  await productRepository.save(product);

  return product;
};

export default dvdCreateService;
