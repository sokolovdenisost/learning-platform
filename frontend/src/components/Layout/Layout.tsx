import React, { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Button } from '../Button/Button';
import { SignInModal, SignUpModal } from '../Modal/Modal';
import { UserMenu } from '../UserMenu/UserMenu';
import './Layout.scss';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ title, children }: Props) => {
  const [authModal, setAuthModal] = useState({
    type: '',
    active: false,
  });
  const [active, setActive] = useState(false);
  const auth = false;

  function setModalOptions(type: string) {
    setAuthModal({ ...authModal, active: !authModal.active, type: type });
  }

  return (
    <>
      <div className="layout">
        <div className="layout-top">
          <div className="layout-logo"></div>
          {auth ? (
            <div className="layout-rigth">
              <div className="layout-notification">
                <IoNotificationsOutline size={30} />
              </div>
              <div className="layout-user">
                <div className="layout-user-section" onClick={() => setActive(!active)}>
                  <img
                    src="https://images.unsplash.com/photo-1628344806892-11873eba7974?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                  <div className="arrow">
                    <RiArrowDownSLine size={30} />
                  </div>
                </div>
              </div>
              {active ? <UserMenu active={active} setActive={setActive} /> : null}
            </div>
          ) : (
            <div className="layout-auth">
              <Button type="outline" color="main" fontSize="16" onClick={() => setModalOptions('signUp')}>
                Sign up
              </Button>
              <Button type="bold" color="main" fontSize="16" onClick={() => setModalOptions('signIn')}>
                Sign in
              </Button>
            </div>
          )}
        </div>
        <div className="layout-block">
          <div className="layout-title">{title}</div>
          <div className="layout-body">{children}</div>
        </div>
      </div>
      {authModal.active && authModal.type === 'signIn' ? (
        <SignInModal modal={authModal} setModal={setAuthModal} />
      ) : authModal.active && authModal.type === 'signUp' ? (
        <SignUpModal modal={authModal} setModal={setAuthModal} />
      ) : null}
    </>
  );
};
