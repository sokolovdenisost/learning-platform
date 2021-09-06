import React from 'react';
import { BiNews, BiBrain } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { TiMortarBoard } from 'react-icons/ti';
import { MdFavoriteBorder } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

import { NavButton } from './Button/NavButton';
import './Navigator.scss';

const authRoutes = [
  { title: 'News', icon: <BiNews size={30} />, href: '/' },
  { title: 'Courses', icon: <HiOutlineBookOpen size={30} />, href: '/courses' },
  { title: 'My courses', icon: <TiMortarBoard size={30} />, href: '/my-courses' },
  { title: 'Favorites', icon: <MdFavoriteBorder size={30} />, href: '/favorites' },
  { title: 'Create course', icon: <BiBrain size={30} />, href: '/create' },
  { title: 'Settings', icon: <FiSettings size={30} />, href: '/settings' },
];

const noAuthRoutes = [
  { title: 'News', icon: <BiNews size={30} />, href: '/' },
  { title: 'Courses', icon: <HiOutlineBookOpen size={30} />, href: '/courses' },
];

interface Props {
  auth: any;
}

export const Navigator = ({ auth }: Props) => {
  const mapButtonsAuth = authRoutes.map((r) => {
    return <NavButton key={r.title} href={r.href} title={r.title} icon={r.icon} />;
  });

  const mapButtonsNoAuth = noAuthRoutes.map((r) => {
    return <NavButton key={r.title} href={r.href} title={r.title} icon={r.icon} />;
  });

  return (
    <div className="navigator">
      <div className="navigator-block">{auth._id ? mapButtonsAuth : mapButtonsNoAuth}</div>
    </div>
  );
};
