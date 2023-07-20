export const randomlyChooseProductsForCarousel = (products, numProducts) => {
  const chosenProducts = [];
  let numChosen = 0;
  while (numChosen < numProducts) {
    const nextChoiceIndex = Math.floor(Math.random() * products.length);
    if (!chosenProducts.includes(nextChoiceIndex)) {
      chosenProducts.push(products[nextChoiceIndex]);
      numChosen++;
    }
  }

  return chosenProducts;
}