import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Assets/CSS/CreateProductForm.css";

const ProductDetail = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://celebrated-oasis-4ee7b2b6a3.strapiapp.com/api/products/${params.id}?populate=*`
        );
        setProduct(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.attributes.ProductName}</h1>
      <p>Quantity: {product.attributes.quantity}</p>
      <p>Price: {product.attributes.price}</p>
      <p>Description: {product.attributes.Description}</p>
      {product.attributes.image.data && (
        <img
          src={`${product.attributes.image.data.attributes.url}`}
          alt={product.attributes.p_name}
          width="300"
        />
      )}
    </div>
  );
};

export default ProductDetail;
