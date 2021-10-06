import React from "react";
import { FaUsers } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { VscVerified, VscUnverified } from "react-icons/vsc";
import "./Dashboard.scss";

interface Props {
  text: string;
  count: number;
  href: string;
}

const icons: Icons = {
  Users: {
    icon: <FaUsers size={40} color="#5158aa" />,
    color: "#f2f3fb",
  },
  Courses: {
    icon: <HiOutlineBookOpen size={40} color="#d08485" />,
    color: "#fce6e4",
  },
  Untested: {
    icon: <VscUnverified size={40} color="#d32f2f" />,
    color: "#ffebee",
  },
  Proven: {
    icon: <VscVerified size={40} color="#0288d1" />,
    color: "#e1f5fe",
  },
};

export const Dashboard = ({ text, count, href }: Props) => {
  const dashboardType = text.split(" ")[0];

  return (
    <a className="dashboard" href={href}>
      <div className="dashboard-left">
        <div className="dashboard-text">{text}</div>
        <div className="dashboard-count">Amount: {count}</div>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-icon" style={{ background: icons[dashboardType] ? icons[dashboardType].color : null }}>
          {icons[dashboardType] ? icons[dashboardType].icon : null}
        </div>
      </div>
    </a>
  );
};

interface Icons {
  [key: string]: any;
}
