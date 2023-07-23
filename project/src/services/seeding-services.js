import { retrieveFoodData } from "./edamam-api-services.js";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { createFoodObjFromAPI, generateRandomQuantities } from "./firestore-services.js";

export const seedDB = async (searchTerms, numPerTerm) => {
  const batch = writeBatch(db);

  // Iterating through the list of given search terms making API calls
  // and retrieving food data from these calls to add to batch
  for (const searchTerm of searchTerms) {
    const retFoodData = (await retrieveFoodData(searchTerm)).hints;

    const foodObjsToBatch = randomlyTrimFoodData(retFoodData, numPerTerm);

    foodObjsToBatch.forEach(foodObj => {
      const trimmedFoodObj = createFoodObjFromAPI(foodObj);
      // Randomly generating the new food object's quantities array, weights 
      // array, and price. This should only occur once during seeding
      // TODO: this probably shouldn't be hardcoded in here
      const [ quantities, pricePerKilo, weights ] = generateRandomQuantities(
        2,
        10,
        1, 
        10
      );
      trimmedFoodObj.quantities = quantities;
      trimmedFoodObj.pricePerKilo = pricePerKilo;
      trimmedFoodObj.weights = weights;

      const newFoodRef = doc(db, 'foods', foodObj.foodId);
      batch.set(newFoodRef, trimmedFoodObj);
    })
  }

  try {
    await batch.commit();
  } catch (err) {
    throw new Error('Error committing batch when seeding database.');
  }
};

// Returns up to n food objects from the given data that contain
// images
const randomlyTrimFoodData = (foodData, n) => {
  const retFoodObjs = [];
  let numChosen = 0;

  for (let i = 0; i < foodData.length; i++) {
    const currFoodObj = foodData[i].food;

    if (numChosen === n) 
      break;
    
    
    if (currFoodObj.image && currFoodObj.label.split(' ').length < 4) {
      retFoodObjs.push(currFoodObj)
      numChosen++;
    }
  }

  return retFoodObjs;
};
