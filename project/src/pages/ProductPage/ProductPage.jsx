import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../services/firestore-services";
import HookForm from "../../components/HookForm/HookForm";
import imageNotFound from "../../assets/icon-image-not-found-free-vector.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import style from "./ProductPage.module.scss";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [invalidQuantity, setInvalidQuantity] = useState(false);
  const [numPurchased, setNumPurchased] = useState(null);

  useEffect(() => {
    getFoodById(id, 'foods')
      .then(food => setProduct(food))
      .catch(err => console.error(err));
  }, []);

  const formSubmit = data => {
    setInvalidQuantity(false);
    setNumPurchased(null);

    const { weight, quantity } = data;

    console.log(weight, quantity);

    // Checking if the quantity is valid for the given weight
    const weightIndex = product.weights.findIndex(element => element === weight);
    if (weightIndex < 0)
      throw new Error("Invalid weight retrieved from form.");

    let quantities = product.quantities;
    
    if (quantity < 1 || quantity > quantities[weightIndex]) {
      setInvalidQuantity(true);
    } else {
      setNumPurchased(quantity);

      console.log("here");
      
      // Updating database
      quantities[weightIndex] -= quantity;
      // Removing the appropriate weights and quantities elements if the 
      // corresponding quantity is now < 1 / the item has been bought out
      if (quantities[weightIndex] < 1) {
        quantities = quantities.slice(0, weightIndex)
          .concat(quantities.slice(weightIndex + 1, quantities.length));

        product.weights = product.weights.slice(0, weightIndex)
          .concat(product.weights.slice(weightIndex + 1, product.weights.length));

        console.log(quantities, product.weights);
      }

      const docRef = doc(db, "foods", id);
      updateDoc(docRef, { quantities: quantities, weights: product.weights })
        .then(docRef => console.log(`${product.name}'s document updated`))
        .catch(err => console.error(err));
    }
  };

  return (
    <main className={style.product_page_main}>
      {product ? (
        <>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>

          <h2 className={style.product_page_main__heading}>
            {product ? product.name : "Loading..."}
          </h2>

          <img
            className={style.product_page_main__img}
            src={product.imageUrl ? product.imageUrl : imageNotFound}
            alt={`${product.name} picture`}
          />

          {product.quantities.length > 0 ? <HookForm product={product} formSubmit={formSubmit} /> : <p>Out of stock.</p>}
          {invalidQuantity && 
            <p className={style.product_page_main__error_msg}>Invalid quantity to purchase given.</p>}
          {numPurchased && 
            <p className={style.product_page_main__success_msg}>{`${numPurchased} added to cart.`}</p>}
          
        </>
      ) : (
        <FontAwesomeIcon icon={faSpinner} />
      )} 
    </main>
  );
};

export default ProductPage;