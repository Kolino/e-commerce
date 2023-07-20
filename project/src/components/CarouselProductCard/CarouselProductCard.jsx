import style from "./CarouselProductCard.module.scss";
import imageNotFound from "../../assets/icon-image-not-found-free-vector.jpeg";

const CarouselProductCard = product => {
  // TODO: fix this
  const prod = product.product;

  return (
  <div>
    <img src={prod.imageUrl ? prod.imageUrl : imageNotFound} alt={`${product.name} image` } />
    <p>{product.name}</p>
  </div>);
};

export default CarouselProductCard;