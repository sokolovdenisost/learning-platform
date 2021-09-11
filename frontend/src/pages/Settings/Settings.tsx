import React, { useEffect, useState } from 'react';
import { Block } from '../../components/Block/Block';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { Notification } from '../../components/Notification/Notification';
import { Social } from '../../components/Social/Social';
import { changeInputHandler } from '../../hooks/change';
import { IUser } from '../../interfaces/user';
import { changePassword, changePersonalData, changePhoto } from '../../utils/settings';
import './Settings.scss';

interface Props {
  user: IUser;
}

export const Settings = ({ user }: Props) => {
  const [file, setFile] = useState<any>({});
  const [formPD, setFormPD] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: {
      public_id: user.avatar.public_id,
      photo_url: user.avatar.photo_url,
    },
    photo: [],
  });
  const [formP, setFormP] = useState({
    oldPassword: '',
    newPassword: '',
    rNewPassword: '',
  });
  const [result, setResult] = useState({
    type: '',
    text: '',
    code: 0,
  });

  async function fetchChangeSettings(body: any, fn: any) {
    setResult({
      type: '',
      text: '',
      code: 0,
    });
    const result = await fn(body);

    setResult(result);

    setTimeout(
      () =>
        setResult({
          type: '',
          text: '',
          code: 0,
        }),
      5000,
    );
  }

  function onSave() {}

  async function changeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFile({ [e.currentTarget.id]: e.currentTarget.files });
  }

  return (
    <Layout title="Settings">
      <div className="settings-page">
        <div className="left">
          <div className="settings-item">
            <Block
              title="Personal Details"
              subtitle="Feel free to edit your basic information such as name, email etc."
              onSave={() => fetchChangeSettings(formPD, changePersonalData)}>
              <div className="settings-form">
                <div className="fullname">
                  <Input
                    width={170}
                    label="First name"
                    id="firstName"
                    value={formPD.firstName}
                    onChange={(e) => changeInputHandler(e, formPD, setFormPD)}
                  />
                  <Input
                    width={170}
                    label="Last name"
                    id="lastName"
                    value={formPD.lastName}
                    onChange={(e) => changeInputHandler(e, formPD, setFormPD)}
                  />
                </div>
                <Input label="Email address" id="email" value={formPD.email} onChange={(e) => changeInputHandler(e, formPD, setFormPD)} />
              </div>
            </Block>
          </div>
          <div className="settings-item">
            <Block
              title="Security Details"
              subtitle="Passwords must be at least 16 characters long and contain a combination of numbers, symbols, uppercase and lowercase letters, and spaces."
              onSave={() => fetchChangeSettings(formP, changePassword)}>
              <div className="security-form">
                <Input label="Old password" id="oldPassword" type="password" onChange={(e) => changeInputHandler(e, formP, setFormP)} />
                <Input label="New password" id="newPassword" type="password" onChange={(e) => changeInputHandler(e, formP, setFormP)} />
                <Input label="Repeat new password" id="rNewPassword" type="password" onChange={(e) => changeInputHandler(e, formP, setFormP)} />
              </div>
            </Block>
          </div>
        </div>
        <div className="rigth">
          <div className="settings-item">
            <Block
              title="Photo details"
              subtitle="The photo is intended for a person viewing your profile to see how you look"
              onSave={() => fetchChangeSettings({ photo: file, _id: user._id }, changePhoto)}>
              <ChangePicture
                img={file.photo ? URL.createObjectURL(file.photo['0']) : user.avatar.photo_url}
                title="Profile picture"
                onChange={changeFile}
              />
            </Block>
          </div>
          {/* <div className="settings-item">
            <Block
              title="Two Factor Authentication"
              subtitle="You must setup a two factor authentication to go inline with our security guidelines."
              onSave={onSave}>
              <div className="two-factor-form">
                <Input label="Phone number" id="phone" />
              </div>
            </Block>
          </div> */}
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
      <>{result.type ? <Notification type={result.type} text={result.text} /> : null}</>
    </Layout>
  );
};
