import React from 'react';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { ProfilePicture } from '../../components/ProfilePicture/ProfilePicture';
import './Settings.scss';

export const Settings = () => {
  return (
    <Layout title="Settings">
      <div className="settings-page">
        <Block title="Personal Details" subtitle="Feel free to edit your basic information such as name, email etc." onClick={() => console.log('test')}>
          <ProfilePicture />
          <div className="settings-form">
            <div className="fullname">
              <Input width={170} label="First name" id="firtsName" />
              <Input width={170} label="Last name" id="lastName" />
            </div>
            <Input label="Email address" id="email" />
          </div>
        </Block>
      </div>
    </Layout>
  );
};
