import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselProductCard from "../../components/CarouselProductCard/CarouselProductCard";

const ProductCarousel = ({ products }) => {
  return (
    <Carousel 
      showThumbs={false} 
      width={400} 
      autoPlay
      interval="3000" 
      infiniteLoop
      showArrows={false}
      showStatus={false}
    >
      {products.map((product, i) => <CarouselProductCard key={i} product={product} />)}
    </Carousel>
  );
};

export default ProductCarousel;