import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css";

import Wrapper from "../../components/wrapper/wrapper";
import BackButton from "../../components/backButton/index";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button/button";
import Alert from "../../components/alert/index";
import authContext, {setUser} from "../../contexts/authContext";


function RecoveryConfirmPage() {
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext)

    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleCodeChange = (value, isValid) => {
        setCode(value);
        setEmptyFields(false);
        setIsValid(isValid);
    };

    const handlePasswordChange = (value, isValid) => {
        setPassword(value);
        setEmptyFields(false);
        setPasswordError(!isValid);
    };

    const handleRecoveryConfirm = async () => {
        if (code.trim() === "" || password.trim() === "") {
            setEmptyFields(true);
            return;
        } else if (codeError || passwordError) {
            return;
        }

        try {

            const res = await fetch("http://localhost:5000/api/auth/recovery-confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code, password
                }),
            });

            const result = await res.json();

            if (res.ok) {
                dispatch(setUser(result.user))
                localStorage.setItem(
                    "token", result.token
                );
                setEmptyFields(false);
                navigate("/balance");
            } else {
                setCodeError(result.message);
            }
        } catch (err) {
            console.error(err);

        }
    };

    return (
        <Wrapper>
            <React.Fragment>
                <BackButton/>
                <Heading
                    title="Recover password"
                    subtitle="Write the code you received"
                />

                <form className="form">
                    <Field
                        label="Code"
                        type="number"
                        name="code"
                        placeholder="Enter your code"
                        onChange={handleCodeChange}
                    />
                    <Field
                        label="New password"
                        type="password"
                        name="password"
                        formType="signUp"
                        placeholder="Enter your new password"
                        onChange={handlePasswordChange}
                    />
                    <Button
                        onClick={handleRecoveryConfirm}
                        text="Restore password"
                        className="button--primary"
                        disabled={!isValid || passwordError || Boolean(!password)}
                    />

                    {emptyFields && <Alert text={"Please fill in all the fields"}/>}
                    {codeError && <Alert text={codeError}/>}
                </form>
            </React.Fragment>
        </Wrapper>
    );
}

export default RecoveryConfirmPage;
