import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../../services/actions/notificationAction";
import apiStatus from "../../../services/utils/apiStatus";
import NotificationItem from "../notificationItem/NotificationItem";
import { Link } from "react-router-dom";
import "./topNotification.css";
function TopNotification({ children, className, ...others }) {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.notificationList);
  // actions
  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);
  return (
    <div className={"topNotification " + className} {...others}>
      {status === apiStatus.pending && data.length === 0 && (
        <div className="flex justify-center">Mengambil notifikasi</div>
      )}
      {status !== apiStatus.pending && data.length === 0 && (
        <div className="flex justify-center">Belum ada notifikasi</div>
      )}
      {data.slice(0, 3).map((notif, index) => (
        <NotificationItem notif={notif} key={"notif" + index} />
      ))}
      {data.length > 3 && (
        <Link to="/notification" className="flex justify-center">
          Lihat semua notifikasi
        </Link>
      )}
    </div>
  );
}

export default TopNotification;
