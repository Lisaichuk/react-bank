import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";

import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function SigninPage(): React.ReactElement {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const [userNotExistText, setUserNotExistText] = useState("");

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setEmptyFields(false);
    setEmailError(!isValid);
    setUserNotExist(false);
    setUserNotExistText("");
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
    setEmptyFields(false);
    setPasswordError(!isValid);
    setUserNotExistText("");
  };

  const handleSignin = async () => {
    if (email === "" || password === "") {
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
        }),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            user: data.user,
          },
        });
        setUserNotExist(false);
        setUserNotExistText("");
        navigate("/balance");
      } else {
        const errorData = await res.json();
        setUserNotExist(true);
        setUserNotExistText(errorData.message);
        navigate("/signup-confirm");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
        />

        {userNotExist && <Alert text={userNotExistText} />}
        {emptyFields && <Alert text={"Please fill in all the fields"} />}
      </form>
    </React.Fragment>
  );
}

export default SigninPage;
