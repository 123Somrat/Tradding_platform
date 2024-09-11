import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { socket } from "../Socket";

export default function Notifications() {
  const [shownotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState<number>();
  const showNotification = () => {
    setNotificationCount(0);
    setShowNotification(!shownotification);
  };

  useEffect(() => {
    socket.on("expiredDueNotifications", (data) => {
      setNotifications(data);
      setNotificationCount(data.length);
    });

    return () => {
      socket.off("expiredDueNotifications");
    };
  }, []);

  return (
    <div className="m-4">
      <div className="relative">
        <NotificationsNoneIcon fontSize="large" onClick={showNotification} />
        {(notificationCount as number) > 0 && (
          <span className="absolute top-[50%] left-[80%] translate-x-[-50%] translate-y-[-80%] w-[25px] h-[25px] bg-red-200 rounded-full flex justify-center items-center">
            {notificationCount}
          </span>
        )}
      </div>

      {shownotification && (
        <div className="w-72 top-16 md:top-[50px]  md:w-80 h-auto absolute border-2 rounded-sm z-50 bg-gray-50 sm:right-[1px] md:right-[54px] p-2">
          {(notifications.length as number) <= 0 ? (
            <span className="block text-green-900 text-center">
              Your notifications box is empty
            </span>
          ) : (
            <>
              {notifications.map((notification, index) => (
                <NavLink to={"/dashboard/Expired_Due"}>
                  <h1 key={index} className=" border-2 rounded-sm p-3 my-2">
                    {notification} due has been expired
                  </h1>
                </NavLink>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
