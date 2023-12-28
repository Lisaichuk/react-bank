import React, {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
// import { useAuth } from "../../component/authRoute";
import "./index.css";

import Wrapper from "../../commonElements/wrapper/wrapper";
import BackButton from "../../commonElements/backButton/index";
import Heading from "../../commonElements/heading";
import Field from "../../commonElements/field";
import Button from "../../commonElements/button/button";
import Alert from "../../commonElements/alert/index";
import authContext, {setUser} from "../../contexts/authContext";


function SigninPage() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(authContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [userNotExist, setUserNotExist] = useState(false);
    const [userNotExistText, setUserNotExistText] = useState("");

    const errorAuthComponent = (
        <Link className="link" to={"/signup-confirm"}>
            Confirm email
        </Link>
    );

    const handleEmailChange = (value, isValid) => {
        setEmail(value);
        setEmailError(!isValid);
        setEmptyFields(false);
        setUserNotExist(false);
    };

    const handlePasswordChange = (value, isValid) => {
        setPassword(value);
        setPasswordError(!isValid);
        setEmptyFields(false);
        setUserNotExist(false);
    };

    const handleSignin = async () => {
        if (email.trim() === "" || password.trim() === "") {
            setEmptyFields(true);
            return;
        } else if (emailError || passwordError) {
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                dispatch(setUser(result.user))
                localStorage.setItem(
                    "token", result.user.token
                );

                setEmptyFields(false);
                setUserNotExist(false);
                setUserNotExistText("Your email has not been confirmed");
                if (result.user.isConfirmed) navigate("/balance");
                else navigate('/signup-confirm');
            } else {
                setUserNotExist(true);
                setUserNotExistText(result.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Wrapper>
            <React.Fragment>
                <BackButton/>
                <Heading title="Sign In" subtitle="Select login method"/>

                <form className="form">
                    <Field
                        label={"Email"}
                        type={"email"}
                        name={"email"}
                        placeholder={"Enter your email"}
                        formType="signIn"
                        onChange={handleEmailChange}
                    />
                    <Field
                        label={"Password"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Enter your password"}
                        formType="signIn"
                        onChange={handlePasswordChange}
                    />

                    <div className="link-prefix">
                        Forgot your password?{" "}
                        <Link to={"/recovery"} className="link">
                            Restore
                        </Link>
                    </div>

                    <Button
                        onClick={handleSignin}
                        text="Continue"
                        className="button--primary"
                        disabled={
                            emailError ||
                            passwordError ||
                            Boolean(!password) ||
                            Boolean(!email)
                        }
                    />
                </form>

                {emptyFields && <Alert text={"Please fill in all the fields"}/>}
                {userNotExist && <Alert text={userNotExistText}/>}
                {userNotExistText.includes("Your email has not been confirmed") && (
                    <div>{errorAuthComponent}</div>
                )}
            </React.Fragment>
        </Wrapper>
    );
}

export default SigninPage;
