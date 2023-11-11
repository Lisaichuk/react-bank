import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../component/authRoute";
import "./index.css";

import { Page } from "../../component/page";
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
  const [codeError, setCodeError] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCodeChange = (value: string, isValid: boolean) => {
    setCode(value);
    setEmptyFields(false);
    setIsValid(isValid);
  };

  const errorAuthComponent = (
    <Link className="link" to={"/signup"}>
      Please sign up
    </Link>
  );

  const handleSignupConfirm = async () => {
    if (code.trim() === "") {
      setEmptyFields(true);
      return;
    } else if (codeError) {
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

      const data = await res.json();

      if (res.ok) {
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            user: data.user,
          },
        });

        localStorage.setItem("authState", JSON.stringify(data));
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

          {emptyFields && <Alert text={"Please fill in all the fields"} />}
          {codeError && <Alert text={codeError} />}
          {codeError.includes("You are not logged in") && (
            <div>{errorAuthComponent}</div>
          )}
        </form>
      </React.Fragment>
    </Page>
  );
}

export default SignupConfirmPage;
