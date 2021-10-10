import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateAdmin } from "../../../interfaces/state";
import { getBanUsers } from "../../../store/actions/adminAction";
import { User } from "../../components/User/User";
import "./AdminBanUsers.scss";

export const AdminBanUsers = () => {
  const { banUsers, loading }: IStateAdmin = useSelector((state: IState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanUsers());
  }, []);

  const mapBanUsers = banUsers.map((user) => {
    return <User user={user} key={user._id} />;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Ban users">
      <div className="ban-users-page">{mapBanUsers}</div>
    </Layout>
  );
};
