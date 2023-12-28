import React, {useContext} from 'react';
import Wrapper from "../../commonElements/wrapper/wrapper";
import {useParams} from "react-router-dom";
import authContext from "../../contexts/authContext";
import Header from "../../commonElements/header/header";
import Notification from "../notification/notification";
import moment from "moment";
import './index.css'

const TransactionPage = (props) => {
    let params = useParams();
    console.log(params)
    const {state} = useContext(authContext);
    let transaction = state.currentUser.userData.transactions.find((item) => +item.transactionId === +params.transactionId
    )
    let date = moment(transaction.time).format('DD MMMM, HH:mm')
    return (
        <Wrapper>
            <div className="notifications__page">
                <Header pageName="Transaction"/>
                <div className="content__block">
                    <div className="transaction-sum">{transaction.sum}</div>
                    <div className="transaction-information">
                        <div className={'transaction-row'}>
                            <div>Date</div>
                            <div>{date}</div>
                        </div>
                        <hr className={'divider'}/>
                        <div className={'transaction-row'}>
                            <div>Adress</div>
                            <div>{transaction.email || transaction.paymentSystem}</div>
                        </div>
                        <hr className={'divider'}/>
                        <div className={'transaction-row'}>
                            <div>Type</div>
                            <div>{transaction.type}</div>
                        </div>
                    </div>

                </div>
            </div>
        </Wrapper>
    );
};

export default TransactionPage;