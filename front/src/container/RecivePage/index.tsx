import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

import { Page } from "../../component/page";
import BackButton from "../../component/backButton";
import Heading from "../../component/heading";
import Field from "../../component/field";
import Button from "../../component/button";

const RecivePage: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "" });
  //   const handleInputChange = (name: string, value: string) => {
  //     setData({ ...data, [name]: value });
  //   };

  const handleSendCode = async () => {
    try {
      const response = await fetch("/recovery-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        throw new Error("Sending code failed");
      }

      const result = await response.json();
      console.log(result);

      return navigate("/recovery-confirm");
    } catch (error) {
      console.error("Error sending code:", error);
    }
  };

  return (
    <Page>
      <React.Fragment>
        <BackButton />
        <Heading title="Recover password" subtitle="Choose a recovery method" />

        <div className="content-block">
          <Field
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            //   onChange={handleInputChange}
          />
          <Button
            onClick={handleSendCode}
            text="Send code"
            className="button--primary"
          />
        </div>
      </React.Fragment>
    </Page>
  );
};

export default RecivePage;
