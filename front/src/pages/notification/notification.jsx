import React from 'react';
import "./index.css";
import bell from "../../img/bell.svg";
import warning from "../../img/warning.svg"
import moment from "moment";


const Notification = ({type,time}) => {
    let timeAgo = moment(time).fromNow();

    return (
        <div className="card">

            {type === 'Recovery' && <img src={warning} alt="alert" className="icon"/>}
            {type === 'PasswordChange' && <img src={warning} alt="alert" className="icon"/>}
            {type === 'EmailChange' && <img src={warning} alt="alert" className="icon"/>}
            {type === 'Login' && <img src={bell} alt="bell" className="icon"/>}
            {type === 'Recieve' && <img src={bell} alt="alert" className="icon"/>}
            {type === 'Send' && <img src={bell} alt="alert" className="icon"/>}
            <div className="card__content">
                {type === "Recovery" && <h2 className="notification__title">Recovery</h2>}
                {type === "Login" && <h2 className="notification__title">Login</h2>}
                {type === "Send" && <h2 className="notification__title">Sent money</h2>}
                {type === "Recieve" && <h2 className="notification__title">Reсeive money</h2>}
                {type === "PasswordChange" && <h2 className="notification__title">Password changed</h2>}
                {type === "EmailChange" && <h2 className="notification__title">Email changed</h2>}
                {/*<h2 className="notification__title">New reward system</h2>*/}
                <div className="subtitle__block">
                    <span className="notification__subtitle">{timeAgo}</span>
                    <span className="dot"></span>
                    <span className="notification__subtitle">Announcement</span>
                </div>
            </div>
        </div>
    );
};

export default Notification;