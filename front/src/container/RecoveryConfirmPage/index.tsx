import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../component/authRoute";
import "./index.css";

import { Page } from "../../component/page";
import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function RecoveryConfirmPage(): React.ReactElement {
  const navigate = useNavigate();
  const { state } = useAuth();
  const token = state.token;

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCodeChange = (value: string, isValid: boolean) => {
    setCode(value);
    setEmptyFields(false);
    setIsValid(isValid);
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
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
      console.log("code:", code);
      console.log("password:", password);
      console.log("token:", token);

      const res = await fetch("http://localhost:4000/recovery-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          password: password,
          token: token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmptyFields(false);
        navigate("/balance");
      } else {
        setCodeError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page>
      <React.Fragment>
        <BackButton />
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

          {emptyFields && <Alert text={"Please fill in all the fields"} />}
          {codeError && <Alert text={codeError} />}
        </form>
      </React.Fragment>
    </Page>
  );
}

export default RecoveryConfirmPage;
