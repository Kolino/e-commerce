import { useEffect, useState } from "react";
import { retrieveFoodData } from "../../services/edamam-api-services";
import { getAllFoodsInCollection } from "../../services/firestore-services";
import ProductGrid from "../../containers/ProductGrid/ProductGrid";
import style from "./LandingPage.module.scss";
import Header from "../../components/Header/Header";
import ProductCarousel from "../../containers/ProductCarousel/ProductCarousel";

const LandingPage = () => {
  const [foodData, setFoodData] = useState(null);

  // createFoodDoc(createFoodObjRandomly("pineapple", null), "foods")
  //   .then(data => console.log(data));

  // retrieveFoodData("apple")
  //   .then(data => console.log(data.hints));

  useEffect(() => {
    getAllFoodsInCollection("foods")
    .then(foods => setFoodData(foods))
    .catch(err => console.error(err));
  }, []);

  return (
    <main>
      <Header />
      {foodData ? <ProductCarousel products={foodData} /> : <p>Loading...</p>}
      {foodData ? <ProductGrid products={foodData} /> : <p>Loading...</p>}
    </main>
  );
};

export default LandingPage;