import axios from "axios";
import { navigate } from "gatsby";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignupPage() {
  const onSubmit = async (data) => {
    // console.log(data);
    const url =
      "https://celebrated-oasis-4ee7b2b6a3.strapiapp.com/api/auth/local/";
    // const url = "http://localhost:1337/api/products/";
    try {
      const response = await axios.post(url, {
        identifier: data.email,
        password: data.password,
      });
      localStorage.setItem("jwt", response.data.jwt);
      console.log(response.data);
      const notify = () => toast("Login is successful");
      notify();
      navigate("/");
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
      <br />
      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <input type="submit" />
      <ToastContainer />
    </form>
  );
}
