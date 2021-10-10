import React, { useState } from "react";
import { Block } from "../Block/Block";
import { Button } from "../../../components/Button/Button";
import { useDate } from "../../../hooks/data";
import { IUser } from "../../../interfaces/user";
import "./User.scss";
import { SendNotificationModal } from "../../../components/Modal/Modal";
import { banUser } from "../../../utils/admin";

interface Props {
  user: IUser;
}

export const User = ({ user }: Props) => {
  const [modal, setModal] = useState({
    active: false,
    type: "",
  });
  return (
    <>
      <Block>
        <div className="user-block">
          <div className="user-block-left">
            <img src={user.avatar.photo_url} alt="" className="user-block-image" />
          </div>
          <div className="user-block-right">
            <div className="user-block-info">
              <div className="user-block-fullname">{user.firstName + " " + user.lastName}</div>
              <div className="user-block-register-date">
                Registered <span>{useDate(user.registered)}</span>
              </div>
            </div>
            <div className="user-block-buttons">
              <Button type="bold" color="primary" fontSize="14">
                Change
              </Button>
              <Button type="bold" color="warning" fontSize="14" onClick={() => setModal({ ...modal, active: true })}>
                Send notification
              </Button>
              {user.ban ? (
                <Button type="bold" color="success" fontSize="14">
                  Unban user
                </Button>
              ) : (
                <Button type="bold" color="danger" fontSize="14" onClick={() => banUser(user._id)}>
                  Ban user
                </Button>
              )}
            </div>
          </div>
        </div>
      </Block>
      {modal.active ? <SendNotificationModal user_id={user._id} modal={modal} setModal={setModal} /> : null}
    </>
  );
};
