import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import axios from "axios";
import { GatsbyImage } from "gatsby-plugin-image";
// import "../../Assets/CSS/ProductTable.css"; // Assuming you will create this CSS file for styling

const FetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  // const jwtToken = localStorage.getItem("jwt");
  let jwtToken;
  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      navigate("/");
    }
  }
  if (!jwtToken) {
    navigate("/");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://celebrated-oasis-4ee7b2b6a3.strapiapp.com/api/products?populate=*",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setProducts(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchProducts();
  }, [jwtToken]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://celebrated-oasis-4ee7b2b6a3.strapiapp.com/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/product/updateP/${productId}`);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.attributes.ProductName.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      product.attributes.Description.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      product.attributes.price.toString().includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="product-table">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/product/${product.id}`}>
                  {product.attributes.ProductName}
                </Link>
              </td>
              <td>{product.attributes.quantity}</td>
              <td>{product.attributes.price}</td>
              <td>{product.attributes.Description}</td>
              <td>
                {product.attributes.image.data && (
                  <GatsbyImage
                    image={{
                      // Manually construct a Gatsby Image object using the fetched image URL
                      layout: "constrained",
                      images: {
                        fallback: {
                          src: `${product.attributes.image.data.attributes.url}`,
                          srcSet: `${product.attributes.image.data.attributes.url}`,
                          sizes: "(max-width: 800px) 100vw, 800px",
                        },
                      },
                      width: 800,
                      height: 800, // Change the height as per your image aspect ratio
                      formats: ["auto", "webp", "avif"],
                    }}
                    alt={product.attributes.ProductName}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => handleUpdate(product.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FetchProducts;
