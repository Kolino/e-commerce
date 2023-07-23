import { collection, doc, getDoc, getDocs, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const generateRandomQuantity = (min, max) => {
  let num = Math.ceil(Math.random() * max);
  while (num < min)
    num = Math.ceil(Math.random() * max);

  return num;
}

const generateWeightsArray = (length) => {
  const possibleWeights = [0.5, 1, 2, 3, 4, 5];

  const weights = new Array(length)
    .fill(0);

  let possibleWeight = -1;
  for (let i = 0; i < weights.length; i++) {
    do {
      possibleWeight = possibleWeights[Math.floor(Math.random() * possibleWeights.length)]
    } while (weights.includes(possibleWeight));

    weights[i] = possibleWeight;
  }

  // Sorting the weights here since they don't really correspond to
  // the generated quantities
  weights.sort();

  return weights;
};

export const generateRandomQuantities = (minQuantity, maxQuantity, minPrice, maxPrice) => {
  const quantities = new Array(4)
    .fill(0)
    .map(quantity => generateRandomQuantity(minQuantity, maxQuantity));

  const pricePerKilo = generateRandomQuantity(minPrice, maxPrice);

  const weights = generateWeightsArray(4);

  return [ quantities, pricePerKilo, weights ];
}

export const createFoodObjFromAPI = foodData => {
  let brand = null;
  if (foodData.brand)
    brand = foodData.brand;

  let imageUrl = null;
  if (foodData.image)
    imageUrl = foodData.image;

  return {
    quantities: null, 
    weights: null,
    pricePerKilo: null,
    brand,
    imageUrl,
    name: foodData.label, 
    favourited: false
  };
};

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