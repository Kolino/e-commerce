import imageNotFound from "../../assets/icon-image-not-found-free-vector.jpeg";
import { Link } from "react-router-dom";

const CarouselProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div>
        <img src={product.imageUrl ? product.imageUrl : imageNotFound} alt={`${product.name} picture` } />
      </div>;
    </Link>
  )
};

export default CarouselProductCard;