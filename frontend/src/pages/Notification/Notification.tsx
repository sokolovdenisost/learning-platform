import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components/Layout/Layout";
import { Loader } from "../../components/Loader/Loader";
import { NotificationItem } from "../../components/Notification/Notification";
import { IState, IStateUser } from "../../interfaces/state";
import { getNotifications } from "../../store/actions/userAction";
import "./Notification.scss";

export const Notification = () => {
  const { notifications, user, loading }: IStateUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications(user._id));
  }, []);

  const mapNotifications = notifications.map((not) => <NotificationItem key={not._id} notification={not} />).reverse();

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Notification">
      <div className="notification-page">{mapNotifications}</div>
    </Layout>
  );
};
