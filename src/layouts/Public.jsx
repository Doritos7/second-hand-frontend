import React, { useState } from "react";
import Navbar from "../components/navigation/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LinearProgress from "@material/react-linear-progress";
import LoadingFull from "../components/loading/lodingFull/LoadingFull";
import { getLocalJWT, parseJwt } from "../services/utils/jwtHandler";
import {
  getUserDetail,
  setUserData,
  setUserToken,
} from "../services/actions/userAction";
import { useNavigate } from "react-router-dom";
function Public(props) {
  const { token, userDetail, userData } = useSelector((state) => state.user);
  const [showBar, setShowBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const [isGuest, setIsGuest] = useState(true);

  // useEffect(() => {
  //   try {
  //     if (!token) {
  //       const localToken = getLocalJWT();
  //       dispatch(setUserToken(localToken));
  //       const user = parseJwt(localToken);
  //       dispatch(setUserData(user));
  //       dispatch(getUserDetail());
  //       console.log(userDetail);
  //     }
  //     setIsGuest(false);
  //   } catch (error) {
  //     setIsGuest(true);
  //   }
  // }, []);
  // if (!token || isGuest) return <LoadingFull />;
  // else
  return (
    <>
      <div className="md:bg-white md:shadow-md sticky top-0 z-10">
        <div className="container mx-auto">
          <Navbar userData={userData} />
        </div>
        {showBar && (
          <LinearProgress indeterminate buffer={0.9} progress={0.8} />
        )}
      </div>
      <Outlet context={{ setShowBar }} />
    </>
  );
}

export default Public;
