import { useForm } from "react-hook-form";
import schema from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./HookForm.module.scss";

const HookForm = ({ product, formSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form className={style.hook_form} onSubmit={handleSubmit(formSubmit)}>
      <div className={style.hook_form__field}>
        <label htmlFor="weightSelect">Select weight: </label>
        <select id="weightSelect" {...register("weight")}>
          {product.weights.map((weight, i) => 
            <option key={i} value={weight}>{`${weight}kg`}</option>
          )}
        </select>
      </div>

      <div className={style.hook_form__field}>
        <label htmlFor="quantitySelect">Enter quantity: </label>
        <input id="quantitySelect" type="number" {...register("quantity")} />
        {errors.quantity && (
          <p className={style.hook_form__field__error_msg}>{errors.quantity.message}</p>
        )}
      </div>

      <div className={style.hook_form__field}>
        <button className={style.hook_form__field__submit_btn}>
          Add to cart
        </button>
      </div>
    </form>
  );
}

export default HookForm;