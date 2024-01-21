import React, {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import "./index.css";

import Wrapper from "../../components/wrapper/wrapper";
import BackButton from "../../components/backButton/index";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button/button";
import Alert from "../../components/alert/index";
import authContext, {setUser} from "../../contexts/authContext";


const SignupPage = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [userExistText, setUserExistText] = useState("");

    const handleEmailChange = (value, isValid) => {
        setEmail(value);
        setEmailError(!isValid);
        setEmptyFields(false);
        setUserExist(false);
        setUserExistText("");
    };

    const handlePasswordChange = (value, isValid) => {
        setPassword(value);
        setPasswordError(!isValid);
        setEmptyFields(false);
        setUserExist(false);
        setUserExistText("");
    };

    const handleSignup = async () => {
        if (email.trim() === "" || password.trim() === "") {
            setEmptyFields(true);
            return;
        } else if (emailError || passwordError) {
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await res.json();
			
            if (res.ok) {
                localStorage.token = result.user.token;
                dispatch(setUser(result.user))
                setEmptyFields(false);
                setUserExist(false);
                setUserExistText("");
                navigate("/signup-confirm");
            } else {
                setUserExist(true);
                setUserExistText(result.message);
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Wrapper>
            <React.Fragment>
                <BackButton/>
                <Heading title="Sign Up" subtitle="Choose a registration method"/>

                <form className="form">
                    <Field
                        label={"Email"}
                        type={"email"}
                        name={"email"}
                        placeholder={"Enter your email"}
                        formType="signUp"
                        onChange={handleEmailChange}
                    />

                    <Field
                        label={"Password"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Enter your password"}
                        formType="signUp"
                        onChange={handlePasswordChange}
                    />

                    <div className="link-prefix">
                        Already have an account?{" "}
                        <Link to={"/signin"} className="link">
                            Sign In
                        </Link>
                    </div>

                    <Button
                        onClick={handleSignup}
                        text="Continue"
                        className="button--primary"
                        disabled={
                            emailError ||
                            passwordError ||
                            Boolean(!password) ||
                            Boolean(!email)
                        }
                    />

                    {userExist && <Alert text={userExistText}/>}
                    {emptyFields && <Alert text={"Please fill in this fields"}/>}
                </form>
            </React.Fragment>
        </Wrapper>
    );
}

export default SignupPage;