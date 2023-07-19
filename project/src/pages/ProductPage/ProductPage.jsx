import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <p>{`${id} passed in url`}</p>
  );
};

export default ProductPage;