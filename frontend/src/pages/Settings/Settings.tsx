import React, { useState } from 'react';
import { useEffect } from 'react';
import { Block } from '../../components/Block/Block';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { Notification } from '../../components/Notification/Notification';
import { Social } from '../../components/Social/Social';
import { changePersonalData } from '../../utils/settings';
import './Settings.scss';

interface Props {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    _id: string;
  };
}

export const Settings = ({ user }: Props) => {
  const [formPD, setFormPD] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [result, setResult] = useState({
    type: '',
    text: '',
    code: 0,
  });

  async function changePersonalDataHandler() {
    setResult({
      type: '',
      text: '',
      code: 0,
    });
    const result = await changePersonalData(formPD);

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

  useEffect(() => {
    console.log(formPD);
  }, [formPD]);

  function onSave() {}

  function changeInput(e: React.ChangeEvent<HTMLInputElement>, state: any, setState: any) {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  }

  return (
    <Layout title="Settings">
      <div className="settings-page">
        <div className="left">
          <div className="settings-item">
            <Block
              title="Personal Details"
              subtitle="Feel free to edit your basic information such as name, email etc."
              onSave={changePersonalDataHandler}>
              <ChangePicture img={user.avatar} title="Profile picture" />
              <div className="settings-form">
                <div className="fullname">
                  <Input width={170} label="First name" id="firstName" value={formPD.firstName} onChange={(e) => changeInput(e, formPD, setFormPD)} />
                  <Input width={170} label="Last name" id="lastName" value={formPD.lastName} onChange={(e) => changeInput(e, formPD, setFormPD)} />
                </div>
                <Input label="Email address" id="email" value={formPD.email} onChange={(e) => changeInput(e, formPD, setFormPD)} />
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
      <>{result.type ? <Notification type={result.type} text={result.text} /> : null}</>
    </Layout>
  );
};
