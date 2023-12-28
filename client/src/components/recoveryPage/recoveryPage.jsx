import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
// import {useAuth} from "../../component/authRoute";
import "./index.css";

import Wrapper from "../../commonElements/wrapper/wrapper";
import BackButton from "../../commonElements/backButton/index";
import Heading from "../../commonElements/heading";
import Field from "../../commonElements/field";
import Button from "../../commonElements/button/button";
import Alert from "../../commonElements/alert/index";


function RecoveryPage() {
    const navigate = useNavigate();
    // const {state} = useAuth();
    // const token = state.token;

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const handleEmailChange = (value, isValid) => {
        setEmail(value);
        setEmptyFields(false);
        setEmailError(!isValid);
        setError(false);
        setErrorText("");
    };

    const errorAuthComponent = (
        <Link className="link" to={"/signup"}>
            Please sign up
        </Link>
    );

    const handleRecovery = async () => {
        if (email.trim() === "") {
            setEmptyFields(true);
            return;
        } else if (emailError) {
            return;
        }

        try {
            console.log(email);

            const res = await fetch("http://localhost:5000/api/auth/recovery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email
                }),
            });

            const result = await res.json();
            if (res.ok) {
                console.log(`Your recovery code is ${result.recoveryCode}`)

                setEmptyFields(false);
                setError(false);
                setErrorText("This email address does not exist");
                navigate("/recovery-confirm");
            } else {
                setError(true);
                setErrorText(result.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Wrapper>
            <React.Fragment>
                <BackButton/>
                <Heading title="Recover password" subtitle="Choose a recovery method"/>
                <form className="form">
                    <Field
                        label="Email"
                        type="email"
                        name="email"
                        formType="signIn"
                        placeholder="Enter your email"
                        onChange={handleEmailChange}
                    />
                    <Button
                        onClick={handleRecovery}
                        text="Send code"
                        className="button--primary"
                        disabled={emailError || Boolean(!email)}
                    />

                    {error && <Alert text={errorText}/>}
                    {errorText.includes("This email address does not exist") && (
                        <div>{errorAuthComponent}</div>
                    )}
                    {emptyFields && <Alert text={"Please fill in all the fields"}/>}
                </form>
            </React.Fragment>
        </Wrapper>
    );
}

export default RecoveryPage;
