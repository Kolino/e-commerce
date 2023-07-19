import { useEffect, useState } from "react";
import { retrieveFoodData } from "../../services/edamam-api-services";
import { createFoodDoc, createFoodObjRandomly, getAllFoodsInCollection, getFoodById } from "../../services/firestore-services";
import ProductList from "../../containers/ProductList/ProductList";

const LandingPage = () => {
  const [foodData, setFoodData] = useState(null);

  // createFoodDoc(createFoodObjRandomly("pineapple", null), "foods")
  //   .then(data => console.log(data));

  // retrieveFoodData("apple")
  //   .then(data => console.log(data.hints));

  useEffect(() => {
    getAllFoodsInCollection("foods")
    .then(foods => setFoodData(foods));
  }, []);

  return (
    <>
      {foodData ? <ProductList products={foodData}/> : <p>Loading...</p>}
    </>
  );
};

export default LandingPage;