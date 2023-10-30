import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";

import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function RecoveryConfirmPage(): React.ReactElement {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const token = state.token;

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (value: string, isValid: boolean) => {
    setCode(value);
    setEmptyFields(false);
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
    setEmptyFields(false);
    setPasswordError(!isValid);
  };

  const handleRecoveryConfirm = async () => {
    if (code === "" || password === "") {
      setEmptyFields(true);
      return;
    } else if (passwordError) {
      return;
    }

    try {
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

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            user: data.user,
            isLogged: data.isLogged,
          },
        });

        setEmptyFields(false);
        navigate("/balance");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <BackButton />
      <Heading
        title="Recover password"
        subtitle="Write the code you received"
      />

      <form className="form">
        <Field
          label="Code"
          type="code"
          name="code"
          placeholder="Enter your code"
          onChange={handleCodeChange}
        />
        <Field
          label="New password"
          type="password"
          name="password"
          placeholder="Enter your new password"
          onChange={handlePasswordChange}
        />
        <Button
          onClick={handleRecoveryConfirm}
          text="Restore password"
          className="button--primary"
        />

        {emptyFields && <Alert text={"Please fill in all the fields"} />}
        {error && <Alert text={error} />}
      </form>
    </React.Fragment>
  );
}

export default RecoveryConfirmPage;
