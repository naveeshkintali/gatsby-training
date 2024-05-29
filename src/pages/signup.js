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
      "https://celebrated-oasis-4ee7b2b6a3.strapiapp.com/api/auth/local/register";
    // const url = "http://localhost:1337/api/products/";
    try {
      const response = await axios.post(url, {
        username: data.FirstName,
        FirstName: data.FirstName,
        LastName: data.LastName,
        password: data.password,
        email: data.email,
        Mobile: data.Mobile,
      });
      console.log(response.data);
      const notify = () => toast("Login is successful");
      notify();
      navigate("/login");
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
        <select {...register("Title", { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
        <input
          type="text"
          placeholder="First name"
          {...register("FirstName", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          placeholder="Last name"
          {...register("LastName", { required: true, maxLength: 100 })}
        />
      </div>
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
      <br />
      <input
        type="tel"
        placeholder="Mobile number"
        {...register("Mobile", {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
      />
      <br />
      <input type="submit" />
      <ToastContainer />
    </form>
  );
}
