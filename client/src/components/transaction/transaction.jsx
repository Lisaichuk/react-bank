import React from 'react';
import sending from "../../img/sending.svg";
import stripe from "../../img/stripe.webp";
import coinbase from "../../img/coinbase.png";
import './index.css';
import moment from "moment";

const Transaction = ({data}) => {
    let time = moment(data.time).format('HH:mm')
    return (
        <div className="card-notification">
            <div className="transaction-info">
                {data.paymentSystem === "Stripe" && <img src={stripe} alt="sending" className="icon"/>}
                {data.paymentSystem === "Coinbase" && <img src={coinbase} alt="sending" className="icon"/>}
                {data.email && <img src={sending} alt="sending" className="icon"/>}


                <div className="transaction-content">
                    {data.paymentSystem && <h2 className="transaction-name">{data.paymentSystem}</h2>}
                    {data.email && <h2 className="transaction-name">{data.email}</h2>}
                    <div className="subtitle__block">
                    <span className="transaction-subtitle">
                      {time}
                    </span>
                        <span className="dot"></span>
                        {data.type === "Refill" && <span className="transaction-type">Receipt</span>}
                        {data.type === "Receive" && <span className="transaction-type">Receipt</span>}
                        {data.type === "Send" && <span className="transaction-type">Sending</span>}

                    </div>
                </div>
            </div>
            {data.type !== "Send" && <div className={"transaction-amount-green"}>
                {data.sum}
            </div>}
            {data.type === "Send" && <div className={"transaction-amount"}>
                {data.sum}
            </div>}
        </div>
    );
};

export default Transaction;