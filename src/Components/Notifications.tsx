import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useState } from "react";

export default function Notifications() {
 const [notification,setShowNotification] = useState(false)

  const showNotification = ()=>{
     setShowNotification(!notification)
  }


  return (
    <div className="m-4">
        <div className="relative">
        <NotificationsNoneIcon  fontSize="large" onClick={showNotification}/> 
        <span className="absolute top-[50%] left-[80%] translate-x-[-50%] translate-y-[-80%] w-[25px] h-[25px] bg-red-200 rounded-full flex justify-center items-center">12</span>
        </div>
           
          {notification && <div className="w-80 h-auto absolute border-2 rounded-sm z-50 bg-gray-50  right-[54px]">
             <h1>somrat</h1>
             <h1>Notification 1</h1>
             <h1>Notification 2</h1>
             <h1>Notification 1</h1>
             <h1>Notification 1</h1>
             <h1>Notification 1</h1>
             <h1>Notification 1</h1>
             <h1>Notification 1</h1>
             <h1>Notification 1</h1>
           </div>
     } 
    </div>
  );
}
