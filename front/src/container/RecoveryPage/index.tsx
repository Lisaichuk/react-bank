import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "./index.css";

import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";
import Alert from "../../component/alert";

function RecoveryPage(): React.ReactElement {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
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

  const handleRecovery = async () => {
    if (email === "") {
      setEmptyFields(true);
      return;
    } else if (emailError) {
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            user: data.user,
          },
        });

        setEmptyFields(false);
        navigate("/recovery-confirm");
      } else {
        const errorData = await res.json();
        setUserNotExist(true);
        setUserNotExistText(errorData.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <BackButton />
      <Heading title="Recover password" subtitle="Choose a recovery method" />

      <form className="form">
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleEmailChange}
        />
        <Button
          onClick={handleRecovery}
          text="Send code"
          className="button--primary"
        />

        {userNotExist && <Alert text={userNotExistText} />}
        {emptyFields && <Alert text={"Please fill in all the fields"} />}
      </form>
    </React.Fragment>
  );
}

export default RecoveryPage;
