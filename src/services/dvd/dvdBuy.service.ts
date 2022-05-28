import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";
import { IDvdBuy } from "../../interfaces/dvds";
import { Stock } from "../../entities/stock.entity";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";

const dvdBuyService = async ({ quantity, dvdId, authEmail }: IDvdBuy) => {
  const productRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const dvds = await productRepository.find();
  const dvdBuy = dvds.find((dvd) => dvd.id == dvdId);
  if (!dvdBuy) {
    throw new AppError(404, "dvd not found");
  }

  console.log(dvdBuy);

  const users = await userRepository.find();
  const user = users.find((user) => user.email === authEmail);
  if (!user) {
    throw new AppError(400, "User not found");
  }

  console.log(user);

  const carts = await cartRepository.find();
  const cart = carts.find((cart) => cart.id == user.cart.id);

  console.log(dvdBuy);
  console.log(user);
  console.log(cart);

  if (quantity > dvdBuy.stock.quantity) {
    throw new AppError(
      422,
      `current stock: ${dvdBuy.stock.quantity}, received demand ${quantity}`
    );
  }

  cart.dvds = [...cart.dvds, dvdBuy];
  cart.total = cart.total + quantity * dvdBuy.stock.price;

  await cartRepository.save(cart);

  return cart;
};

export default dvdBuyService;
