import React, { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import error from "../../assets/error.png";
import warning from "../../assets/warning.png";
import success from "../../assets/success.png";
import info from "../../assets/info.png";
import "./Notification.scss";

interface Props {
  text: string;
  type: string;
}

export const Notification = ({ type, text }: Props) => {
  const [active, setActive] = useState(false);

  setTimeout(() => {
    setActive(true);
  }, 300);

  return (
    <div className={type !== "" && active ? `notification active` : `notification active noactive`}>
      <div className={`notification-image ${type}`}>
        {type === "Error" ? (
          <RiErrorWarningLine size={100} color="#fff" />
        ) : type === "Success" ? (
          <AiOutlineCheckCircle size={100} color="#fff" />
        ) : null}
      </div>
      <div className="notification-text">{text}</div>
    </div>
  );
};

const notificationsInfo: notificationsInfo = {
  error: {
    img: error,
  },
  warning: {
    img: warning,
  },
  success: {
    img: success,
  },
  info: {
    img: info,
  },
};

export const NotificationItem = ({ notification }: NotificationItem) => {
  return (
    <div className="notification-item">
      <img src={notificationsInfo[notification.type].img} alt="notification" className="notification-image" />
      <div className="notification-text">{notification.text}</div>
    </div>
  );
};

interface NotificationItem {
  notification: {
    _id: string;
    type: string;
    text: string;
  };
}

interface notificationsInfo {
  [key: string]: any;
}
