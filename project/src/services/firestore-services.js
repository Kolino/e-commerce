import { collection, doc, getDoc, getDocs, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const generateRandomQuantity = (min, max) => {
  console.log("min max", min, max);
  let num = Math.ceil(Math.random() * max);
  while (num < min)
    num = Math.ceil(Math.random() * max);
    console.log(min, max, num)

  return num;
}

const generateRandomQuantities = (minQuantity, maxQuantity, minWeight, maxWeight, minPrice, maxPrice) => {
  console.log(minQuantity, maxQuantity, minWeight, maxWeight, minPrice, maxPrice);
  // Generating a random quantity
  const quantity = generateRandomQuantity(minQuantity, maxQuantity);

  // Generating random weights
  const weights = new Array(quantity)
    .fill(0)
    .map(weight => generateRandomQuantity(minWeight, maxWeight));

  // Generating a random price
  const pricePerKilo = generateRandomQuantity(minPrice, maxPrice);

  return [ quantity, weights, pricePerKilo ];
}

export const createFoodObjFromAPI = foodData => {
  // Data should only be randomly generated when the database
  // is being created
  // TODO: minQuantity, etc. shouldn't be hardcoded
  const randomQuantities = generateRandomQuantities(0, 10, 250, 1000, 1, 10);

  let brand = null;
  if (foodData.brand)
    brand = foodData.brand;

  let imageUrl = null;
  if (foodData.image)
    imageUrl = foodData.image;

  return {
    quantity: randomQuantities[0], 
    weights: randomQuantities[1],
    pricePerKilo: randomQuantities[2],
    brand,
    imageUrl,
    name: foodData.label, 
    favourited: false
  };
};

export const createFoodObjRandomly = (name, imageUrl) => {
  // Data should only be randomly generated when the database
  // is being created
  // TODO: minQuantity, etc. shouldn't be hardcoded
  const randomQuantities = generateRandomQuantities(0, 10, 250, 1000, 1, 10);

  return {
    quantity: randomQuantities[0], 
    weights: randomQuantities[1],
    pricePerKilo: randomQuantities[2],
    brand: null,
    imageUrl,
    name, 
    favourited: false
  };
}

export const createFoodDoc = async (foodObj, collectionKey) => {
  try {
    const newFoodDocRef = doc(db, collectionKey, foodObj.name);
    setDoc(newFoodDocRef, foodObj);

    return newFoodDocRef;
  } catch (err) {
    throw err;
  }
}

export const getFoodById = async (foodId, collectionKey) => {
  const docRef = doc(db, collectionKey, foodId);
  const food = await getDoc(docRef);
  if (!food.exists())
    throw new Error(
      `Unable to retrieve document with id "${foodId}"`
    );
  
  return food.data();
};

export const getAllFoodsInCollection = async collectionKey => {
  const collectionRef = collection(db, collectionKey);
  const foods = await getDocs(collectionRef);

  return foods.docs.map(food => ({ id: food.id, ...food.data() }));
};