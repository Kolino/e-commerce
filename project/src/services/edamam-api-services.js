export const retrieveFoodData = async food => {
  const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=bd76d254&app_key=82fbb57e778efb3bbbc4a0c86b32128f&ingr=${food}&nutrition-type=cooking`);
  if (!response.ok)
    throw new Error(`Unable to retrieve data for ${food} from Edamam API.`);
  
  const foodData = await response.json();

  return foodData;
};