import React, { useState } from 'react';
import { useEffect } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiArrowDownSLine } from 'react-icons/ri';
import { API_URL } from '../../consts';
import { useAuth } from '../../hooks/auth';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
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
  const auth = useAuth();

  if (auth.loading) {
    return null;
  }

  function setModalOptions(type: string) {
    setAuthModal({ ...authModal, active: !authModal.active, type: type });
  }

  return (
    <>
      <div className="layout">
        <div className="layout-top">
          <div className="layout-logo"></div>
          {auth.user.firstName ? (
            <div className="layout-rigth">
              <div className="layout-notification">
                <IoNotificationsOutline size={30} />
              </div>
              <div className="layout-user">
                <div className="layout-user-section" onClick={() => setActive(!active)}>
                  <img src={auth.user.avatar} alt="" />
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
