import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateUser } from "../../../interfaces/state";
import { getAllUsers } from "../../../store/actions/adminAction";
import { User } from "../../components/User/User";
import "./AdminUsers.scss";

export const AdminUsers = () => {
  const { users, loading }: IStateUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const mapUsers = users.map((user) => <User key={user._id} user={user} />);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Users">
      <div className="users-page">{mapUsers}</div>
    </Layout>
  );
};
