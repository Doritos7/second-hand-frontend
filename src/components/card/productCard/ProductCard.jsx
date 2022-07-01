import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentLoader from "react-content-loader";
import React from "react";
import "./productCard.css";
function ProductCard({ product, ...others }) {
  return (
    <div className="productCard" {...others}>
      <div className="cardHeader">
        <img
          src={
            process.env.REACT_APP_API_URL +
            "/images/" +
            product.images_url.split(",")[0]
          }
          alt={product.name}
          className="productImage"
        />
      </div>
      <div className="cardBody">
        <div className="productName">{product.name}</div>
        <div className="productCategory">Aksesoris</div>
        <div className="productPrice">
          {" "}
          {product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </div>
      </div>
    </div>
  );
}
export const ProductCardAdd = () => {
  return (
    <div className="addProduct">
      <FontAwesomeIcon icon={faPlus} color="gray" size="2x" />
      <p>Tambah Produk</p>
    </div>
  );
};

export const ProductCardLoading = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={250}
      viewBox="0 0 300 250"
      backgroundColor="#ffffff"
      foregroundColor="#d4cade"
      {...props}
    >
      <rect x="0" y="12" rx="0" ry="0" width="100%" height="154" />
      <rect x="0" y="176" rx="0" ry="0" width="100%" height="19" />
      <rect x="0" y="202" rx="0" ry="0" width="100%" height="14" />
      <rect x="0" y="223" rx="0" ry="0" width="100%" height="20" />
    </ContentLoader>
  );
};
export default ProductCard;
