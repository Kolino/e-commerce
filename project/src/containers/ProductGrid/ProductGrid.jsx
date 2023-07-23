import ProductList from "../ProductList/ProductList";
import style from "./ProductGrid.module.scss";

const ProductGrid = ({ products }) => {
  return (
    <section className={style.product_grid}>
      <ProductList products={products} toDisplay={15} />
    </section>
  )
};

export default ProductGrid;