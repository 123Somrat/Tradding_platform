import { io } from "socket.io-client";

const expiredDueNotificationsSocketConnectionUrl =
  "http://localhost:4000/expiredDueNotifications?token=abcd";

export const expiredDueNotifications = io(
  expiredDueNotificationsSocketConnectionUrl,
  { withCredentials: true }
);

expiredDueNotifications.on("connect_error", (error) => {
  if (error.message === "Unauthorized") {
    console.error("Connection denied: Unauthorized access");
    expiredDueNotifications.disconnect(); // Disconnect the client to stop retrying
  }
  if (error instanceof WebTransportError) {
    console.log("Transport error, disconnecting...");
    expiredDueNotifications.disconnect();
  }
});
