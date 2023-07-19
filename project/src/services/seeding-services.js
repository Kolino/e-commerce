import { retrieveFoodData } from "./edamam-api-services.js";
import { collection, writeBatch, doc, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { createFoodObjFromAPI } from "./firestore-services.js";

export const seedFoodType = async (searchTerm, collectionKey) => {
  // Retrieving data from API
  const retFoodData = (await retrieveFoodData(searchTerm)).hints;

  const batch = writeBatch(db);

  retFoodData.forEach((food, i) => {
    const newFoodRef = doc(db, collectionKey, i);
    batch.set(newFoodRef, createFoodObjFromAPI(food.food));
  });

  return await batch.commit();
  // try {
  //   const collectionRef = collection(db, 'test');
  //   const newTestRef = await addDoc(collectionRef, { name: 'testing' });
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }
};
