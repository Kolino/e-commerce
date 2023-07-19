import style from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  return (
    <article className={style.product_card}>
      <p>{product.name}</p>
      <p>{product.pricePerKilo}</p>
    </article>
  )
};

export default ProductCard;