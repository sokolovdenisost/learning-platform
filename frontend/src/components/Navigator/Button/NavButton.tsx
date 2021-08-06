import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavButton.scss';

interface Props {
  icon: JSX.Element;
  title: string;
  href: string;
}

export const NavButton = ({ icon, title, href }: Props) => {
  return (
    <NavLink to={href} exact className="nav-button" activeClassName="active">
      <div className="nav-block-icon">{icon}</div>
      <div className="nav-title">{title}</div>
    </NavLink>
  );
};
