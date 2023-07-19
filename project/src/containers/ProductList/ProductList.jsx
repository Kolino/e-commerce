import ProductCard from "../../components/ProductCard/ProductCard";

const ProductList = ({ products }) => {
  console.log(products);

  return (
    <>
      {products && products.map((product, i) => <ProductCard key={i} product={product} />)}
    </>
  );
};

export default ProductList;