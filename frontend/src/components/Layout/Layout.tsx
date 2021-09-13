import React, { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/auth';
import { Button } from '../Button/Button';
import { SignInModal, SignUpModal } from '../Modal/Modal';
import { UserMenu } from '../UserMenu/UserMenu';
import './Layout.scss';

import ru_flag from '../../assets/ru_flag.png';
import en_flag from '../../assets/en_flag.png';
import { useSelector } from 'react-redux';

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ title, children }: Props) => {
  const user = useSelector((state: any) => state.user);

  const [authModal, setAuthModal] = useState({
    type: '',
    active: false,
  });
  const [active, setActive] = useState(false);
  const language = localStorage.getItem('language');

  if (user.loading) {
    return null;
  }

  function setModalOptions(type: string) {
    setAuthModal({ ...authModal, active: !authModal.active, type: type });
  }

  function changeLanguage(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    localStorage.setItem('language', e.currentTarget.dataset.flag + '');
    window.location.reload();
  }

  return (
    <>
      <div className="layout">
        <div className="layout-top">
          <div className="layout-logo"></div>
          {user.firstName ? (
            <div className="layout-rigth">
              <div className="layout-language">
                {language === 'ru' ? (
                  <img alt="" src={ru_flag} className="language-flag" data-flag="en" onClick={(e) => changeLanguage(e)} />
                ) : (
                  <img alt="" src={en_flag} className="language-flag" data-flag="ru" onClick={(e) => changeLanguage(e)} />
                )}
              </div>
              <div className="layout-notification">
                <IoNotificationsOutline size={30} />
              </div>
              <div className="layout-user">
                <div className="layout-user-section" onClick={() => setActive(!active)}>
                  <img src={user.avatar.photo_url} alt="" />
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
          {title ? <div className="layout-title">{title}</div> : null}
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
