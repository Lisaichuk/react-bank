import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./index.css";

import Wrapper from "../../commonElements/wrapper/wrapper";
import BackButton from "../../commonElements/backButton/index";
import Heading from "../../commonElements/heading";
import Field from "../../commonElements/field";
import Button from "../../commonElements/button/button";
import Alert from "../../commonElements/alert/index";
import authContext, {setUser} from "../../contexts/authContext";

function SignUpConfirmPage() {
    const navigate = useNavigate();
    const {state,dispatch} = useContext(authContext)
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");
    const [emptyFields, setEmptyFields] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(state.currentUser.isConfirmed){
            navigate('/balance')
        }
        if(state.currentUser.confirmationCode){
            console.log(`Your confirmation code is ${state.currentUser.confirmationCode}`)
        }

    },[])


    const handleCodeChange = (value, isValid) => {
        setCode(value);
        setEmptyFields(false);
        setIsValid(isValid);
    };

    const errorAuthComponent = (
        <Link className="link" to={"/signup"}>
            Please sign up
        </Link>
    );
    // const data = JSON.parse(localStorage.data)
    const email = state.currentUser.email;
    const handleSignupConfirm = async () => {
        // if (code.trim() === "") {
        //     setEmptyFields(true);
        //     return;
        // } else if (codeError) {
        //     return;
        // }

        try {
            const res = await fetch("http://localhost:5000/api/auth/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    email
                }),
            });

            const result = await res.json();

            if (res.ok) {
                dispatch(setUser(result.user))
                localStorage.token =result.user.token
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
                <BackButton />
                <Heading
                    title="Confirm account"
                    subtitle="Write the code you received"
                />

                <form className="form">
                    <Field
                        label={"Code"}
                        type={"number"}
                        name={"code"}
                        placeholder={"Enter your code"}
                        onChange={handleCodeChange}
                    />
                    <Button
                        onClick={handleSignupConfirm}
                        text="Confirm"
                        className="button--primary"
                        disabled={!isValid}
                    />

                    {emptyFields && <Alert text={"Please fill in all the fields"}/>}
                    {codeError && <Alert text={codeError}/>}
                    {codeError.includes("You are not logged in") && (
                        <div>{errorAuthComponent}</div>
                    )}
                </form>
            </React.Fragment>
        </Wrapper>
    );
}

export default SignUpConfirmPage;
