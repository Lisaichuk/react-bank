import React, {useContext, useState} from "react";
import "./index.css";
import BackButton from "../../commonElements/backButton";
import Heading from "../../commonElements/heading";
import Field from "../../commonElements/field";
import Button from "../../commonElements/button/button";
import Wrapper from "../../commonElements/wrapper/wrapper";
import authContext, {setUser} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RecievePage = () => {
    const {dispatch} = useContext(authContext)
    const [sum, setSum] = useState(0)
    const navigate = useNavigate()



    const receiveStripe = async () => {
        try {
            let res = await fetch('http://localhost:5000/api/auth/receive', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sum,
                    paymentSystem: "Stripe"
                })
            })
            const result = await res.json();
            if (res.ok) {
                dispatch(setUser(result.user))
                alert("Received");
                navigate('/balance')
            }
            return res;

        } catch (e) {
            alert(e)
        }
    }
    const receiveCoinBase = async () => {
        try {
            let res = await fetch('http://localhost:5000/api/auth/receive', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sum,
                    paymentSystem: "Coinbase"
                })
            })
            const result = await res.json();
            if (res.ok) {
                dispatch(setUser(result.user))
                alert("Received");
                navigate('/balance')
            }
            return res;

        } catch (e) {
            alert(e)
        }
    }

    return (
        <Wrapper>
            <React.Fragment>
                <BackButton/>
                <Heading title="Receive" subtitle="Choose a receive method"/>
                <div className="content-block">
                    <Field
                        label="Receive method"
                        type="sum"
                        name="sum"
                        placeholder="0$"
                        onChange={setSum}
                    />
                    <Button
                        onClick={() => receiveStripe()}
                        text="Stripe"
                        className="button--primary"
                    />
                    <Button
                        onClick={() => receiveCoinBase()}
                        text="Coinbase"
                        className="button--primary"
                    />
                </div>
            </React.Fragment>
        </Wrapper>
    );
};

export default RecievePage;
