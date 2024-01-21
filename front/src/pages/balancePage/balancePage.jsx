import Wrapper from "../../components/wrapper/wrapper";
import settings from "../../img/settings.svg";
import notifications from "../../img/notifications.svg";
import receive from "../../img/balance-receive.svg";
import send from "../../img/balance-send.svg";
import {Link, useNavigate} from "react-router-dom";
import ButtonIcons from "../../components/buttonIcons";
import "./index.css"
import {useContext} from "react";
import authContext from "../../contexts/authContext";
import Transaction from "../transaction/transaction";

const BalancePage = () => {
    const navigate = useNavigate();
    const {state} = useContext(authContext)
    const handleSettingsButtonClick = () => {
        navigate("/settings");
    };

    const handleNotificationsButtonClick = () => {
        navigate("/notifications");
    };

    const handleReceiveButtonClick = () => {
        navigate("/recive");
    };

    const handleSendButtonClick = () => {
        navigate("/send");
    };

    return (
        <Wrapper>
            <div className="balance__page">
                <div className="header__block">
                    <div className="header__action">

                        <ButtonIcons
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
                        />
                    </div>
                    <div className="sum">${state.currentUser && state.currentUser.userData.balance}</div>
                </div>

                <div className="transfer__block">
                    <div className="transfer-receive">
                        <ButtonIcons
                            src={receive}
                            alt="receive"
                            onClick={handleReceiveButtonClick}
                        />
                        <span className="transfer-title">Receive</span>
                    </div>
                    <div className="transfer-send">
                        <ButtonIcons
                            src={send}
                            alt="send"
                            onClick={handleSendButtonClick}
                        />
                        <span className="transfer-title">Send</span>
                    </div>
                </div>

                <div className="transactions">
                    {state.currentUser && state.currentUser.userData.transactions.map((item, i) => 
						<Link key={i} className={"transaction-nav"} to={`/transaction/${item.transactionId}`}>
							<Transaction key={item.transactionId}data={{...item}}/>
						</Link>
					)}
                </div>

            </div>
        </Wrapper>
    );
};
export default BalancePage;