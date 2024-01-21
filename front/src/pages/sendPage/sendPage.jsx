import React, {useContext, useState} from "react";

import "./index.css";

import Wrapper from "../../components/wrapper/wrapper";
import Field from "../../components/field";
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import authContext, {setUser} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";


const SendPage = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext);

    const [email, setEmail] = useState('');
    const [sum, setSum] = useState('');

    const handleSendMoney = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/send", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, sum}),
            });
			
            const result = await response.json()
			
            if (!response.ok) {
                alert(result.message)
                throw new Error("Sending money failed");

            }
            dispatch(setUser(result.user));
            alert("Success")
            navigate('/balance')


        } catch (error) {
            console.error("Error sending money:", error);
        }
    }

    return (
        <Wrapper>
            <React.Fragment>
                <Header pageName="Send"/>

                <div className="content-block">
                    <Field
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={setEmail}
                    />
                    <Field
                        label="Sum"
                        type="sum"
                        name="sum"
                        placeholder="$"
                        onChange={setSum}
                    />
                    <Button
                        onClick={() => handleSendMoney()}
                        text="Send"
                        className="button--primary"
                    />
                </div>
            </React.Fragment>
        </Wrapper>
    );
};

export default SendPage;
