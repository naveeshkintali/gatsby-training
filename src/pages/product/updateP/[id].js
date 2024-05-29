import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "gatsby";
import axios from "axios";

const UpdateProduct = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const jwtToken = localStorage.getItem("jwt");

  if (!jwtToken) {
    navigate("/");
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/products/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setProduct(response.data.data);
        reset(response.data.data.attributes); // Populate the form with fetched data
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchProduct();
  }, [params.id]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:1337/api/products/${params.id}`,
        {
          data: data,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      navigate("/product/fetchP"); // Redirect to another page after successful update
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Product Name:</label>
          <input type="text" name="p_name" {...register("ProductName")} />
        </div>
        <div>
          <label>Product Quantity:</label>
          <input type="number" name="p_qty" {...register("quantity")} />
        </div>
        <div>
          <label>Product Price:</label>
          <input type="number" name="p_price" {...register("price")} />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea name="p_desc" {...register("Description")}></textarea>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
