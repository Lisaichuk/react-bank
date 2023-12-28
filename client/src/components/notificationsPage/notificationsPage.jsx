import React, {useContext} from "react";
import "./index.css";

import Header from "../../commonElements/header/header";
import Wrapper from "../../commonElements/wrapper/wrapper";
import Notification from "../notification/notification";
import authContext from "../../contexts/authContext";

const NotificationsPage = () => {
    const {state} = useContext(authContext);
    return (
        <Wrapper>
            <div className="notifications__page">
                <Header pageName="Notifications"/>
                <div className="content__block">
                    {state.currentUser && state.currentUser.userData.notifications.map((item,i)=><Notification key={i} time={item.time} type={item.type}></Notification>)}
                </div>
            </div>
        </Wrapper>
    );
};

export default NotificationsPage;
