import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../components/button/buttonPrimary/ButtonPrimary";
import iconCamera from "../../assets/images/icon-camera.png";
import iconArrowLeft from "../../assets/images/icon-arrow-left.png";
import { useOutletContext } from "react-router-dom";
import "./productAdd.css";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategories } from "../../services/actions/categoryAction";
import DropzoneImages from "../../components/dropzoneImages";
import { createProduct } from "../../services/actions/productApi";
import LoadingFull from "../../components/loading/lodingFull/LoadingFull";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductAdd(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navProps = useOutletContext();
  const { values, errors, handleChange } = useForm();
  const {
    categories,
    pending: catPending,
    error: catError,
  } = useSelector((state) => state.categoryList);
  const { data, pending, error, success, message } = useSelector(
    (state) => state.product
  );
  const [imagesUrl, setImagesUrl] = useState([]);
  // actions
  const doCreateProduct = (e) => {
    e.preventDefault();
    if (checkIsFormValid()) {
      const formData = { ...values, images_url: imagesUrl.toString() };
      dispatch(createProduct(formData));
      if (error) toast.error(message);
      if (success) {
        navigate("/product-list", {
          state: { message: "Produk berhasil di tambahkan" },
        });
      }
    } else toast.warn("Data produk belum lengkap");
  };

  // helpers
  const checkIsFormValid = () => {
    setImagesUrl(imagesUrl);
    if (Object.keys(values).length === 0) return false;
    if (Object.keys(errors).find((key) => errors[key] !== null)) return false;
    if (imagesUrl.length === 0) return false;
    return true;
  };
  // effect
  useEffect(() => {
    navProps.setNavType("back");
    navProps.setNavTitle("Lengkapi Detail Produk");
    dispatch(getCategories());
  }, []);
  return (
    <div className="productAddWrapper">
      {pending && <LoadingFull />}
      <button className="btnBack" onClick={() => navigate(-1)}>
        <img src={iconArrowLeft} alt="back" />
      </button>
      <div className="productAdd">
        <form
          className="productAddForm"
          action="post"
          onSubmit={doCreateProduct}
        >
          <div className="inputWrapper">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama Produk"
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="price">Harga Produk</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Rp 100"
              onChange={handleChange}
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="categories">Kategori</label>
            <select name="categories" id="categeories" onChange={handleChange}>
              <option value="" disabled>
                Pilih Kategori
              </option>
              {!catPending &&
                !catError &&
                categories.map((cat) => (
                  <option value={cat.id} key={"catprod" + cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="inputWrapper">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              placeholder="Contoh warna,merek dan lain-lain"
              onChange={handleChange}
            />
          </div>

          <div className="inputWrapper">
            <DropzoneImages imagesUrl={imagesUrl} setImagesUrl={setImagesUrl} />
          </div>
          <div className="flex gap-3 mt-3 w-full ">
            <ButtonPrimary className="w-full" type="outlined">
              Preview
            </ButtonPrimary>
            <ButtonPrimary className="w-full">Terbitkan</ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductAdd;
