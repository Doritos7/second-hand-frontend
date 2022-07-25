import React, { useState } from "react";
import "./productView.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  checkIsProductNego,
  deleteProduct,
  getMyProduct,
  getProduct,
  releaseProduct,
  unReleaseProduct,
} from "../../services/actions/productAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiStatus from "../../services/utils/apiStatus";
import { useOutletContext } from "react-router-dom";
import ButtonPrimary from "../../components/button/buttonPrimary/ButtonPrimary";
import { Helmet } from "react-helmet-async";
import BuyerNegoModal from "../../components/modal/buyerNegoModal/BuyerNegoModal";
import { postWhishList } from "../../services/actions/whishlistAction";
import { postBuyerNego } from "../../services/actions/negotiationAction";
import SellerCard from "../../components/card/sellerCard/SellerCard";
const ProductView = () => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext();

  //data
  const { data, status, nego, checkNegoStatus, message } = useSelector(
    (state) => state.product
  );
  const {
    data: wishData,
    status: wishStatus,
    message: wishMessage,
  } = useSelector((state) => state.whishlist);
  const { status: negoStatus, message: negoMessage } = useSelector(
    (state) => state.negotiation
  );
  const { userProfile } = useSelector((state) => state.user);
  const [isAction, setIsAction] = useState(false);
  const [isActionWish, setIsActionWish] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isNego, setIsNego] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // actions
  const doReleaseProduct = () => {
    dispatch(releaseProduct(params.productId));
    setIsAction(true);
  };
  const doUnReleaseProduct = () => {
    dispatch(unReleaseProduct(params.productId));
    setIsAction(true);
  };
  const doEditProduct = () => {
    navigate("/product-edit/" + params.productId);
    setIsAction(true);
  };
  const doDeleteProduct = () => {
    dispatch(deleteProduct(params.productId));
    setIsDelete(true);
  };
  const doNego = (negoPrice) => {
    dispatch(
      postBuyerNego({ product_id: params.productId, nego_price: negoPrice })
    );
    setShowModal(false);
    setIsNego(true);
  };

  const doWish = () => {
    if (userProfile === null) navigate("/login");
    dispatch(
      postWhishList({
        product_id: params.productId,
      })
    );
    setIsActionWish(true);
  };

  // effects
  useEffect(() => {
    if (userProfile !== null && userProfile.id == params.userId)
      navigate("/product-view/seller/" + params.productId);
    if (params.productId && params.userType === "seller")
      dispatch(getMyProduct(params.productId));
    else {
      dispatch(getProduct(params.productId));
      dispatch(checkIsProductNego(params.productId));
    }
    outletContext.setNavType(null);
    outletContext.setNavTitle(null);
  }, [params.productId]);

  useEffect(() => {
    if (status === apiStatus.pending) {
      outletContext.setShowBar(true);
    } else if (status === apiStatus.success && isDelete) {
      toast.success("Produk telah di hapus");
      setIsDelete(false);
      navigate("/product-list/products");
    } else if (status === apiStatus.error && isDelete) {
      toast.error(message);
      navigate("/product-list/products");
      setIsDelete(false);
    } else if (status === apiStatus.success && isAction) {
      data.is_release
        ? toast.success("Produk berhasil di rilis", {
            toastId: "hideToast",
          })
        : toast.success("Produk berhasil di sembunyikan", {
            toastId: "releaseToast",
          });
      setIsAction(false);
    } else if (status === apiStatus.error && !isDelete && !isAction) {
      toast.error("Produk tidak tersedia", { toastId: "productViewToast" });
      navigate("/");
    }
    if (status !== apiStatus.pending) outletContext.setShowBar(false);
  }, [status]);

  useEffect(() => {
    if (wishStatus === "pending") {
      outletContext.setShowBar(true);
    } else if (wishStatus === "success" && isActionWish) {
      toast.success("Produk ini masuk whishlist anda");
      outletContext.setShowBar(false);
      setIsActionWish(false);
    } else if (wishStatus === "error" && isActionWish) {
      toast.error(wishMessage);
      outletContext.setShowBar(false);
      setIsActionWish(false);
    }
  }, [wishStatus]);

  useEffect(() => {
    if (negoStatus === apiStatus.pending) {
      outletContext.setShowBar(true);
    } else if (negoStatus === apiStatus.success && isNego) {
      dispatch(checkIsProductNego(params.productId));
      toast.success("Penawaran berhasil dikirim");
    } else if (negoStatus === apiStatus.error && isNego) {
      toast.error(negoMessage);
    }
    if (negoStatus !== apiStatus.pending) {
      outletContext.setShowBar(false);
      setIsNego(false);
    }
  }, [negoStatus]);

  // helpers
  const negoTextStatus = {
    pending: "Penjual belum merespon penawaran mu",
    accepted:
      "Yeay Penjual menyetujui penawaran mu. Kamu akan segera dihubungi penjual",
    rejected: "Penawaran mu belum di setujui penjual,Yuk tawar lagi",
    done: "Sudah terjual",
  };
  // condtitional comp
  const renderSellerButton = () => {
    if (data.status)
      return (
        <>
          {data?.is_release ? (
            <button
              className="buttonOne button button-primary"
              onClick={doUnReleaseProduct}
            >
              Sembunyikan
            </button>
          ) : (
            <button
              className="buttonOne button button-primary"
              onClick={doReleaseProduct}
            >
              Terbitkan
            </button>
          )}
          <button
            className="buttonTwo button button-primary"
            onClick={doEditProduct}
          >
            Edit
          </button>
          {/* <button
            className="outline  rounded-md py-3 px-2 outline-1 outline-red-600"
            onClick={doDeleteProduct}
          >
            Hapus Produk
          </button> */}
        </>
      );
    else return <ButtonPrimary type="disabled">Sudah Terjual</ButtonPrimary>;
  };
  const renderUserButton = () => {
    if (data.status)
      return (
        <>
          {checkNegoStatus === apiStatus.pending && (
            <ButtonPrimary>Loading...</ButtonPrimary>
          )}
          {nego === null && checkNegoStatus !== apiStatus.pending && (
            <ButtonPrimary
              onClick={() => {
                if (userProfile === null) navigate("/login");
                setShowModal(true);
              }}
            >
              Saya tertarik
            </ButtonPrimary>
          )}
          {nego !== null && (
            <div className="grid gap-2">
              <p className={"negoTextStatus_" + nego.status}>
                {negoTextStatus[nego.status] +
                  ". Kamu menawar produk ini seharga " +
                  nego.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
              </p>
              {nego.status !== "done" && (
                <ButtonPrimary type="disabled">Sudah ditawar</ButtonPrimary>
              )}
              {nego.status === "done" && (
                <ButtonPrimary type="disabled">
                  Produk sudah terjual
                </ButtonPrimary>
              )}
              {nego.status === "rejected" && (
                <ButtonPrimary onClick={() => setShowModal(true)}>
                  Tawar Lagi !
                </ButtonPrimary>
              )}
            </div>
          )}
          <ButtonPrimary className={"mt-5"} type={"outlined"} onClick={doWish}>
            tambah ke wishlist
          </ButtonPrimary>
        </>
      );
    else return <ButtonPrimary type="disabled">Sudah Terjual</ButtonPrimary>;
  };
  if (status === apiStatus.success && data !== null && data !== undefined)
    return (
      <>
        {data.name && (
          <Helmet>
            <title>Seconhand. {data.name}</title>
          </Helmet>
        )}

        <div className="HalamanProduk">
          <div className="halamanProdukWraper">
            <div className="flex basis-1/2 flex-col">
              {data.images_url && (
                <Carousel
                  showArrows={true}
                  className="carousel"
                  showThumbs={false}
                >
                  {data.images_url.split(",").map((url) => (
                    <img
                      src={process.env.REACT_APP_STORAGE_URL + "/images/" + url}
                      className="imageProduct"
                      key={"productImg" + url}
                    />
                  ))}
                </Carousel>
              )}

              <div className=" border-2 border-gray rounded-xl mb-5">
                <h1 className="my-5 mx-5 font-medium">Deskripsi</h1>
                <p className="mx-5 mb-5 text-regular text-gray-400">
                  {data.description && data?.description}
                </p>
              </div>
            </div>
            <div className="flex basis-1/4 flex-col">
              <div className=" shadow-xl flex flex-col rounded-xl w-full p-5">
                <h1 className=" font-bold">{data.name}</h1>
                <h1 className=" pt-1 pb-2 text-regular text-gray-400">
                  {data.categories && data.categories[0].name}
                </h1>
                <h1 className=" pb-5 font-regular">
                  {data.price &&
                    data?.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                </h1>
                {params.userType === "seller" && renderSellerButton()}
                {params.userType !== "seller" && renderUserButton()}
              </div>
              <div className="mt-3">
                <SellerCard seller={data.user} noEdit />
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <BuyerNegoModal
            onClick={() => setShowModal(false)}
            cb={doNego}
            product={data}
          />
        )}
      </>
    );
};

export default ProductView;
