import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/product.entity";

const dvdListService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);

  const dvdList = dvdRepository.find();
  return dvdList;
};

export default dvdListService;
