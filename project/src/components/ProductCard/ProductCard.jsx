import style from "./ProductCard.module.scss";
import imageNotFound from "../../assets/icon-image-not-found-free-vector.jpeg"
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <article className={style.product_card}>
        <h2 className={style.product_card__header}>{product.name}</h2>
        <img 
          className={style.product_card__img}
          src={product.imageUrl ? product.imageUrl : imageNotFound} 
          alt={`${product.name} picture`} 
        />
        <p className={style.product_card__price}>{`$${product.pricePerKilo}.00/kg`}</p>
      </article>
    </Link>
  )
};

export default ProductCard;