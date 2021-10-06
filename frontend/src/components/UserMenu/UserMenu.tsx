import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { IState } from "../../interfaces/state";
import { IUser } from "../../interfaces/user";
import { logoutHandler } from "../../utils/auth";
import "./UserMenu.scss";

interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserMenu = ({ active, setActive }: Props) => {
  const user: IUser = useSelector((state: IState) => state.user.user);

  const linksUserMenu = [
    {
      icon: <CgProfile size={24} />,
      title: "Profile",
      href: `/user/${user._id}`,
    },
    {
      icon: <IoMdLogOut size={24} />,
      title: "Logout",
    },
  ];

  const linksAdminMenu = [
    {
      icon: <RiAdminLine size={24} />,
      title: "Admin",
      href: "/admin",
    },
    ...linksUserMenu,
  ];

  const [activeMenu, setActiveMenu] = useState(false);
  const rootEl = useRef<any>(null);

  if (active) {
    setTimeout(() => {
      setActiveMenu(true);
    }, 0);
  }

  useEffect(() => {
    const onClick = (e: any) => {
      if (rootEl.current) {
        return rootEl.current.contains(e.target) || setActive(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const mapUserLinks = linksUserMenu.map((c) => {
    if (c.href) {
      return (
        <a className="user-menu-link" href={c.href} key={c.title}>
          {c.icon}
          <span className="user-menu-link-text">{c.title}</span>
        </a>
      );
    }

    return (
      <div className="user-menu-link" onClick={logoutHandler} key={c.title}>
        {c.icon}
        <span className="user-menu-link-text">{c.title}</span>
      </div>
    );
  });

  const mapAdminLinks = linksAdminMenu.map((c) => {
    if (c.href) {
      return (
        <a className="user-menu-link" href={c.href} key={c.title}>
          {c.icon}
          <span className="user-menu-link-text">{c.title}</span>
        </a>
      );
    }

    return (
      <div className="user-menu-link" onClick={logoutHandler} key={c.title}>
        {c.icon}
        <span className="user-menu-link-text">{c.title}</span>
      </div>
    );
  });

  return (
    <div ref={rootEl} className={activeMenu ? "user-menu active" : "user-menu"}>
      {user.role === "admin" ? mapAdminLinks : mapUserLinks}
    </div>
  );
};
