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

function RecoveryPage(): React.ReactElement {
  const navigate = useNavigate();
  const { state } = useAuth();
  const token = state.token;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleEmailChange = (value: string, isValid: boolean) => {
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
      console.log(token);

      const res = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          token: token,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem(
          "authState",
          JSON.stringify({
            email: data.email,
            token: data.token,
          })
        );

        setEmptyFields(false);
        setError(false);
        setErrorText("This email address does not exist");
        navigate("/recovery-confirm");
      } else {
        setError(true);
        setErrorText(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page>
      <React.Fragment>
        <BackButton />
        <Heading title="Recover password" subtitle="Choose a recovery method" />

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

          {error && <Alert text={errorText} />}
          {errorText.includes("This email address does not exist") && (
            <div>{errorAuthComponent}</div>
          )}
          {emptyFields && <Alert text={"Please fill in all the fields"} />}
        </form>
      </React.Fragment>
    </Page>
  );
}

export default RecoveryPage;
