import React from 'react';
import { Button } from '../Button/Button';
import './Social.scss';

import vk from '../../assets/vkontakte.png';
import ok from '../../assets/odnoklasniki.png';
import fb from '../../assets/facebook.png';

interface SProps {
  social: Socials;
  connect: boolean;
}

type Socials = 'vk' | 'fb' | 'ok';

function getSocialInfo(social: string): SocialInfo {
  if (social === 'vk') {
    return {
      icon: vk,
      title: 'ВКонтакте',
      shortTitle: 'VKontakte',
    };
  }

  if (social === 'ok') {
    return {
      icon: ok,
      title: 'Однокласники',
      shortTitle: 'OK',
    };
  }

  if (social === 'fb') {
    return {
      icon: fb,
      title: 'Facebook',
      shortTitle: 'Facebook',
    };
  }

  return {
    icon: '',
    title: '',
  };
}

export const Social = ({ social, connect }: SProps) => {
  return (
    <div className={connect ? 'social connect' : 'social'}>
      <div className="social-left">
        <img alt={getSocialInfo(social).title} src={getSocialInfo(social).icon} className="social-icon" />
        <div className="social-title">{getSocialInfo(social).title}</div>
      </div>
      <div className="social-rigth">
        <Button type="outline" color={connect ? 'danger' : 'main'} fontSize="14">
          {connect ? 'Remove' : 'Connect'}
        </Button>
      </div>
    </div>
  );
};

interface SBProps {
  social: string;
}

export const SocialButton = ({ social }: SBProps) => {
  return (
    <div className="social-button">
      <img src={getSocialInfo(social).icon} alt={getSocialInfo(social).shortTitle} />
      <div className="social-title">{getSocialInfo(social).shortTitle}</div>
    </div>
  );
};

interface SocialInfo {
  icon: string;
  title: string;
  shortTitle?: string;
}
