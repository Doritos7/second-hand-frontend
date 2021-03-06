import React, { useEffect, useState, useRef } from "react";
import ButtonPrimary from "../../components/button/buttonPrimary/ButtonPrimary";
import iconArrowLeft from "../../assets/images/icon-arrow-left.png";
import { useOutletContext } from "react-router-dom";
import "./productAdd.css";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategories } from "../../services/actions/categoryAction";
import DropzoneImages from "../../components/dropzoneImages";
import { createProduct } from "../../services/actions/productAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiStatus from "../../services/utils/apiStatus";
import { Helmet } from "react-helmet-async";
import PreviewModal from "../../components/modal/previewModal/PreviewModal";
import { getUserDetail } from "../../services/actions/userAction";

function ProductAdd(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const { values, errors, handleChange } = useForm();
  const {
    categories: catData,
    pending: catPending,
    error: catError,
  } = useSelector((state) => state.categoryList);
  const [showPreview, setShowPreview] = useState(false);
  const { data, status, message } = useSelector((state) => state.product);
  const { userDetail } = useSelector((state) => state.user);
  const [isAction, setIsAction] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  // actions
  const doCreateProduct = (e) => {
    e.preventDefault();
    if (checkIsFormValid()) {
      if (imagesUrl.length === 0) {
        toast.warn("Tambahkan foto produk");
        console.log(imagesUrl);
        return;
      }
      const formData = { ...values, images_url: imagesUrl.toString() };
      dispatch(createProduct(formData));
      setIsAction(true);
    } else toast.warn("Data produk belum lengkap");
  };
  const doShowPreview = (e) => {
    e.preventDefault();
    if (checkIsFormValid()) setShowPreview(true);
    else toast.warn("Data produk belum lengkap");
  };
  // helpers
  const checkIsFormValid = () => {
    setImagesUrl(imagesUrl);
    if (Object.keys(values).length === 0) return false;
    if (Object.keys(errors).find((key) => errors[key] !== null)) return false;
    if (
      values.categories === undefined ||
      values.name === undefined ||
      values.price === undefined ||
      values.categories === undefined ||
      values.categories === 0 ||
      values.description === undefined ||
      imagesUrl.length < 1
    )
      return false;
    return true;
  };
  // effect
  useEffect(() => {
    outletContext.setNavType("back");
    outletContext.setNavTitle("Lengkapi Detail Produk");
    dispatch(getUserDetail());
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    if (status === apiStatus.pending) {
      outletContext.setShowBar(true);
    } else if (status === apiStatus.success && isAction) {
      toast.success("produk berhasil di tambahkan");
      setIsAction(false);
      navigate("/product-list/products");
    } else if (status === apiStatus.error && isAction) {
      if (!message) toast.error("Tidak dapat terhubung ke server");
      toast.error(message);
      setIsAction(false);
    }
    if (status !== apiStatus.pending) outletContext.setShowBar(false);
  }, [status]);
  return (
    <>
      <Helmet>
        <title>Secondhand. Tambahkan produk</title>
      </Helmet>
      <div className="productAddWrapper">
        {/* <button className="btnBack" onClick={() => navigate(-1)}>
          <img src={iconArrowLeft} alt="back" />
        </button> */}
        <div className="productAdd">
          <form className="productAddForm" method="post">
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
              <select
                name="categories"
                id="categeories"
                onChange={handleChange}
                defaultValue={0}
              >
                <option value="0">-Pilih Kategori-</option>
                {!catPending &&
                  !catError &&
                  catData.map((cat) => (
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
              <DropzoneImages
                imagesUrl={imagesUrl}
                setImagesUrl={setImagesUrl}
              />
            </div>
            <div className="flex gap-3 mt-3 w-full ">
              <ButtonPrimary
                className="w-full"
                type="outlined"
                onClick={doShowPreview}
              >
                Preview
              </ButtonPrimary>
              <ButtonPrimary className="w-full" onClick={doCreateProduct}>
                Simpan
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
      {showPreview && (
        <PreviewModal
          data={{
            ...values,
            categories: catData.find((cat) => cat.id == values.categories).name,
            images_url: imagesUrl,
            user: userDetail,
          }}
          onClick={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

export default ProductAdd;
