import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignupPage() {
  const onSubmit = async (data) => {
    console.log(data);
    const url =
      "https://celebrated-oasis-4ee7b2b6a3.strapiapp.com/api/products/";
    try {
      const response = await axios.post(url, {
        data: {
          ProductName: data.p_title,
          category: data.p_category,
          Description: data.p_desc,
        },
      });
      console.log(response.data);
      const notify = toast("Login is successful");
      notify();
    } catch (error) {
      console.log(error.message);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="product  name"
          {...register("p_title", { required: true })}
        />
        <input
          type="text"
          placeholder="product category"
          {...register("p_category", { required: true })}
        />
      </div>
      <br />

      <input
        type="text"
        placeholder="Product desc"
        {...register("p_desc", {
          required: true,
        })}
      />
      <br />
      <input type="submit" />
      <ToastContainer />
    </form>
  );
}
