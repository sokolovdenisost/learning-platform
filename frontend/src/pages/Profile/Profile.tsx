import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Block } from "../../components/Block/Block";
import { Button } from "../../components/Button/Button";
import { Layout } from "../../components/Layout/Layout";
import { Completed } from "../../components/ProfileSections/Completed/Completed";
import { Created } from "../../components/ProfileSections/Created/Created";
import { Take } from "../../components/ProfileSections/Take/Take";
import { SocialButton } from "../../components/Social/Social";
import { useData } from "../../hooks/data";
import { IState } from "../../interfaces/state";
import { IUser } from "../../interfaces/user";
import { getUser } from "../../store/actions/userAction";
import "./Profile.scss";

export const Profile = () => {
  const profile: IUser = useSelector((state: IState) => state.user.profile);
  const [section, setSection] = useState<ISection>({
    completed: true,
    take: false,
    created: false,
  });
  const dispatch = useDispatch();

  function changeSection(newSection: string) {
    Object.keys(section).forEach((c) => (section[c] = false));
    setSection({ ...section, [newSection]: !section[newSection] });
  }
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  return (
    <Layout title="Profile">
      <div className="profile-page">
        <Block width="100%">
          <div className="profile-top">
            <div className="profile-left">
              <img src={profile.avatar.photo_url} alt="" className="profile-image" />
              <div className="profile-info">
                <div className="profile-fullname">{profile.firstName + " " + profile.lastName}</div>
                <div className="profile-registered">
                  Registered <br /> <span>{useData(profile.registered)}</span>
                </div>
              </div>
            </div>
            {/* <div className="profile-right">
              <SocialButton social="fb" />
              <SocialButton social="ok" />
              <SocialButton social="vk" />
              <SocialButton social="ok" />
              <SocialButton social="vk" />
            </div> */}
          </div>
        </Block>
        <div className="profile-body">
          <div className="profile-sections-buttons">
            <Button type="bold" color={section.completed ? "main" : "noactive"} fontSize="14" onClick={() => changeSection("completed")}>
              Courses completed
            </Button>
            <Button type="bold" color={section.take ? "main" : "noactive"} fontSize="14" onClick={() => changeSection("take")}>
              Take courses
            </Button>
            <Button type="bold" color={section.created ? "main" : "noactive"} fontSize="14" onClick={() => changeSection("created")}>
              Created courses
            </Button>
          </div>
          <div className="profile-sections">
            {section.completed ? <Completed id={id} /> : section.take ? <Take id={id} /> : section.created ? <Created id={id} /> : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface ISection {
  [key: string]: boolean;
}
