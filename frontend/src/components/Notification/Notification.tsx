import React, { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
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
