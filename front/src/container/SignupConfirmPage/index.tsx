import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";

import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function SignupConfirmPage(): React.ReactElement {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const token = state.token;

  const [code, setCode] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (value: string, isValid: boolean) => {
    setCode(value);
    setEmptyFields(false);
  };

  const handleSignupConfirm = async () => {
    if (code === "") {
      setEmptyFields(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
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
      <Heading title="Confirm account" subtitle="Write the code you received" />

      <form className="form">
        <Field
          label={"Code"}
          type={"number"}
          name={"code"}
          placeholder={"Enter your code"}
          maxLength={6}
          onChange={handleCodeChange}
        />
        <Button
          onClick={handleSignupConfirm}
          text="Confirm"
          className="button--primary"
        />

        {emptyFields && <Alert text={"Please fill in all the fields"} />}
        {error && <Alert text={error} />}
      </form>
    </React.Fragment>
  );
}

export default SignupConfirmPage;
