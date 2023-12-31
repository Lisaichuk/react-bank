import React, { useState } from "react";
import { useAuth } from "../../component/authRoute";
import "./index.css";

import bell from "../../img/bell.svg";
import { Page } from "../../component/page";
import Header from "../../component/header";

const NotificationsPage: React.FC = () => {
  //   const [notifications, setNotifications] = useState([]);
  return (
    <Page>
      <div className="notifications__page">
        <Header pageName="Notifications" />
        <div className="content__block">
          <div className="card">
            <img src={bell} alt="bell" className="icon" />
            <div className="card__content">
              <h2 className="notification__title">New reward system</h2>
              <div className="subtitle__block">
                <span className="notification__subtitle">10 min. ago</span>
                <span className="dot"></span>
                <span className="notification__subtitle">Announcement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NotificationsPage;
