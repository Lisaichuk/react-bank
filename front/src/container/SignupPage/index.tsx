import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";

import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function SignupPage(): React.ReactElement {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [userExistText, setUserExistText] = useState("");

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setEmailError(!isValid);
    setEmptyFields(false);
    setUserExist(false);
    setUserExistText("");
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
    setPasswordError(!isValid);
    setEmptyFields(false);
    setUserExist(false);
    setUserExistText("");
  };

  const handleSignup = async () => {
    if (email === "" || password === "") {
      setEmptyFields(true);
      return;
    } else if (emailError || passwordError) {
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            user: data.user,
            isLogged: data.isLogged,
          },
        });
        setUserExist(false);
        setUserExistText("");
        navigate("/signup-confirm");
      } else {
        const errorData = await res.json();
        setUserExist(true);
        setUserExistText(errorData.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <BackButton />
      <Heading title="Sign Up" subtitle="Choose a registration method" />

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
        />
      </form>

      {userExist && <Alert text={userExistText} />}
      {emptyFields && <Alert text={"Please fill in all the fields"} />}
    </React.Fragment>
  );
}

export default SignupPage;
