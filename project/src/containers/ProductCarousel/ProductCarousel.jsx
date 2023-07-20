import style from "./ProductCarousel.module.scss";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { randomlyChooseProductsForCarousel } from "../../services/container-services";
import CarouselProductCard from "../../components/CarouselProductCard/CarouselProductCard";

const ProductCarousel = ({ products }) => {
  const displayProducts = randomlyChooseProductsForCarousel(products, 3);
  
  console.log(displayProducts);

  return (
    <Carousel showThumbs={false} thumbWidth={50} autoPlay interval="5000" infiniteLoop>
      {displayProducts.map((product, i) => <CarouselProductCard key={i} product={product} />)}
    </Carousel>
  );
};

export default ProductCarousel;