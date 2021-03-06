import Login from "./pages/auth/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@material/react-linear-progress/dist/linear-progress.css";
import Public from "./layouts/Public";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register/Registration";
import ProfileInfo from "./pages/profileInfo/ProfileInfo";
import ProductAdd from "./pages/productAdd/productAdd";
import Negotiationinfo from "./pages/negotiationinfo/Negotiationinfo";
import ProductList from "./pages/productList/ProductList";
import Private from "./layouts/Private";
import ProductEdit from "./pages/productEdit/productEdit";
import ProductView from "./pages/productView/ProductView";
import WhishlistBuyer from "./pages/whishlistBuyer/WhishlistBuyer";
import NotificationPage from "./pages/notificationpage/NotificationPage";
import NegotiationBuyer from "./pages/negotiationBuyer/NegotiationBuyer";
import ChangePassword from "./pages/changePassword/ChangePassword";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Public />}>
            <Route path="/" element={<Home />} />
            <Route path="/:page" element={<Home />} />
            <Route path="/category/:categoryId/:page" element={<Home />} />
            <Route path="/search/:search/:page" element={<Home />} />
            <Route
              path="/product-view/:userType/:userId/:productId"
              element={<ProductView />}
            />
            <Route path="/test" element={<Home />} />
          </Route>
          <Route element={<Private />}>
            <Route path="/profile-info" element={<ProfileInfo />} />
            <Route path="/product-add" element={<ProductAdd />} />
            <Route
              path="/product-view/:userType/:productId"
              element={<ProductView />}
            />
            <Route path="/product-list/:category" element={<ProductList />} />
            <Route
              path="/product-list/:category/:filter"
              element={<ProductList />}
            />
            <Route path="/product-edit/:productId" element={<ProductEdit />} />
            <Route
              path="/negotiation-info/:negoId"
              element={<Negotiationinfo />}
            />
            <Route
              path="/negotiation/:category"
              element={<NegotiationBuyer />}
            />
            <Route path="/whishlist" element={<WhishlistBuyer />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        theme="colored"
        hideProgressBar
        autoClose={1000}
      />
    </div>
  );
}

export default App;
