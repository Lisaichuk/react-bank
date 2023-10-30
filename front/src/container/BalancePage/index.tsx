import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

// import ButtonIcons from "../../component/buttonIcon";

// import settings from "../../img/settings.svg";
// import notifications from "../../img/notifications.svg";
// import receive from "../../img/balance-receive.svg";
// import send from "../../img/balance-send.svg";
import sending from "../../img/sending.svg";

const BalancePage: React.FC = () => {
  //   const navigate = useNavigate();
  const location = useLocation();

  //   const handleSettingsButtonClick = () => {
  //     navigate("/settings");
  //   };

  //   const handleNotificationsButtonClick = () => {
  //     navigate("/notifications");
  //   };

  const transactionInfo =
    (location.state && location.state.transactionInfo) || null;

  return (
    <div className="balance__page">
      <div className="header__block">
        <div className="header__action">
          {/* <ButtonIcons
            src={settings}
            alt="settings"
            className="settings-icon"
            onClick={handleSettingsButtonClick}
          />
          <span className="header__title">Main wallet</span>
          <ButtonIcons
            src={notifications}
            alt="notifications"
            className="notifications-icon"
            onClick={handleNotificationsButtonClick}
          /> */}
        </div>
        <div className="header__sum">$ 100.20</div>
      </div>

      <div className="transfer__block">
        <div className="transfer-receive">
          {/* <ButtonIcons src={receive} alt="receive" /> */}
          <span className="transfer-title">Receive</span>
        </div>
        <div className="transfer-send">
          {/* <ButtonIcons src={send} alt="send" /> */}
          <span className="transfer-title">Send</span>
        </div>
      </div>

      <div className="transactions">
        {transactionInfo && (
          <div className="card">
            <div className="transaction-info">
              <img src={sending} alt="sending" className="icon" />

              <div className="transaction-content">
                <h2 className="transaction-name">{transactionInfo.email}</h2>
                <div className="subtitle__block">
                  <span className="transaction-subtitle">
                    {transactionInfo.date.toLocaleTimeString()}
                  </span>
                  <span className="dot"></span>
                  <span className="transaction-type">
                    {transactionInfo.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="transaction-amount">-${transactionInfo.amount}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalancePage;
