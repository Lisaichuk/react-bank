import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../component/authRoute";
import "./index.css";

import { Page } from "../../component/page";
import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function SigninPage(): React.ReactElement {
  const navigate = useNavigate();
  const { dispatch, state } = useAuth();
  const token = state.token;

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

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setEmailError(!isValid);
    setEmptyFields(false);
    setUserNotExist(false);
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
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
      const res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          token: token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "authState",
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );

        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            user: data.user,
          },
        });

        setEmptyFields(false);
        setUserNotExist(false);
        setUserNotExistText("Your email has not been confirmed");
        navigate("/balance");
      } else {
        setUserNotExist(true);
        setUserNotExistText(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page>
      <React.Fragment>
        <BackButton />
        <Heading title="Sign In" subtitle="Select login method" />

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

        {emptyFields && <Alert text={"Please fill in all the fields"} />}
        {userNotExist && <Alert text={userNotExistText} />}
        {userNotExistText.includes("Your email has not been confirmed") && (
          <div>{errorAuthComponent}</div>
        )}
      </React.Fragment>
    </Page>
  );
}

export default SigninPage;
