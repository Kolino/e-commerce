import ProductCard from "../../components/ProductCard/ProductCard";

const ProductList = ({ products, toDisplay }) => {
  return (
    <>
      {products && products.map((product, i) => {
        if (i < toDisplay)
          return <ProductCard key={i} product={product} />
      })}
    </>
  );
};

export default ProductList;