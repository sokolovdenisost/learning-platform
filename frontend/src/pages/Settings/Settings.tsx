import React from 'react';
import { Block } from '../../components/Block/Block';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { Social } from '../../components/Social/Social';
import './Settings.scss';

export const Settings = () => {
  function onSave() {
    console.log('save');
  }
  return (
    <Layout title="Settings">
      <div className="settings-page">
        <div className="left">
          <div className="settings-item">
            <Block title="Personal Details" subtitle="Feel free to edit your basic information such as name, email etc." onSave={onSave}>
              <ChangePicture title="Profile picture" />
              <div className="settings-form">
                <div className="fullname">
                  <Input width={170} label="First name" id="firtsName" />
                  <Input width={170} label="Last name" id="lastName" />
                </div>
                <Input label="Email address" id="email" />
              </div>
            </Block>
          </div>
          <div className="settings-item">
            <Block
              title="Security Details"
              subtitle="Passwords must be at least 16 characters long and contain a combination of numbers, symbols, uppercase and lowercase letters, and spaces."
              onSave={onSave}>
              <div className="security-form">
                <Input label="Old password" id="oldPassword" type="password" />
                <Input label="New password" id="newPassword" type="password" />
                <Input label="Repeat new password" id="rNewPassword" type="password" />
              </div>
            </Block>
          </div>
        </div>
        <div className="rigth">
          <div className="settings-item">
            <Block
              title="Two Factor Authentication"
              subtitle="You must setup a two factor authentication to go inline with our security guidelines."
              onSave={onSave}>
              <div className="two-factor-form">
                <Input label="Phone number" id="phone" />
              </div>
            </Block>
          </div>
          <div className="settings-item">
            <Block
              title="Connect to Social Accounts"
              subtitle="Merge your facebook, vk.com, ok.ru accounts to log in quickly next time."
              onSave={onSave}>
              <div className="merged-accounts">
                <div className="title">Merged accounts</div>
                <Social social="fb" connect={true} />
              </div>
              <div className="merge-accounts">
                <div className="title">Merge more accounts</div>
                <Social social="vk" connect={false} />
                <Social social="ok" connect={false} />
              </div>
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  );
};
