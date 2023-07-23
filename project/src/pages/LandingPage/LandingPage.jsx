import { useEffect, useState } from "react";
import { getAllFoodsInCollection } from "../../services/firestore-services";
import ProductGrid from "../../containers/ProductGrid/ProductGrid";
import style from "./LandingPage.module.scss";
import Header from "../../components/Header/Header";
import ProductCarousel from "../../containers/ProductCarousel/ProductCarousel";
import { randomlyChooseProductsForCarousel } from "../../services/container-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  const [foodData, setFoodData] = useState(null);
  const [carouselProducts, setCarouselProducts] = useState(null);

  useEffect(() => {
    getAllFoodsInCollection("foods")
    .then(foods => setFoodData(foods))
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (foodData)
      setCarouselProducts(randomlyChooseProductsForCarousel(foodData, 5));
  }, [foodData]);

  return (
    <main className={style.landing_page}>
      <Header />
      {carouselProducts ? <ProductCarousel products={carouselProducts} /> : <FontAwesomeIcon icon={faSpinner} />}
      {foodData ? <ProductGrid products={foodData} /> : <FontAwesomeIcon icon={faSpinner} />}
    </main>
  );
};

export default LandingPage;