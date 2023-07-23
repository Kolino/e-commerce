export const randomlyChooseProductsForCarousel = (products, numProducts) => {
  if (products.length < 0)
    throw new Error('Given products array must have length >= 1.');

  if (products.length < numProducts)
    throw new Error('Given products array must have length >= numProducts arg.');

  if (numProducts < 0)
    throw new Error('The number of products to generate must be >= 0.');

  const chosenProducts = [];
  while (chosenProducts.length < numProducts) {
    const nextChoiceIndex = Math.floor(Math.random() * products.length);

    if (!chosenProducts.includes(products[nextChoiceIndex]))
      chosenProducts.push(products[nextChoiceIndex]);
  }

  return chosenProducts;
};