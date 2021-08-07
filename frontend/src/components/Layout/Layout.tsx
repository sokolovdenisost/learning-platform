import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiArrowDownSLine } from 'react-icons/ri';
import './Layout.scss';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ title, children }: Props) => {
  return (
    <div className="layout">
      <div className="layout-top">
        <div className="layout-logo"></div>
        <div className="layout-user">
          <div className="layout-notification">
            <IoNotificationsOutline size={30} />
          </div>
          <div className="layout-user-logo">
            <img
              src="https://images.unsplash.com/photo-1628344806892-11873eba7974?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="arrow">
              <RiArrowDownSLine size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="layout-block">
        <div className="layout-title">{title}</div>
        <div className="layout-body">{children}</div>
      </div>
    </div>
  );
};
