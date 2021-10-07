import React from "react";
import { Block } from "../Block/Block";
import { Button } from "../../../components/Button/Button";
import { useDate } from "../../../hooks/data";
import { IUser } from "../../../interfaces/user";
import "./User.scss";

interface Props {
  user: IUser;
}

export const User = ({ user }: Props) => {
  return (
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
            <Button type="bold" color="warning" fontSize="14">
              Send notification
            </Button>
            <Button type="bold" color="danger" fontSize="14">
              Ban user
            </Button>
          </div>
        </div>
      </div>
    </Block>
  );
};
