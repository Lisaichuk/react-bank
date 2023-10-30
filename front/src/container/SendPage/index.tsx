import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

import Header from "../../component/header";
import Field from "../../component/field";
import Button from "../../component/button";

const SendPage: React.FC = () => {
  //   const navigate = useNavigate();

  //   const [data, setData] = useState({ email: "", sum: "" });
  //   const handleInputChange = (name: string, value: string) => {
  //     setData({ ...data, [name]: value });
  //   };

  const handleSendMoney = async () => {
    // if (data.email && data.sum) {
    //   try {
    //     const response = await fetch("/send", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email: data.email, sum: data.sum }),
    //     });
    //     if (!response.ok) {
    //       throw new Error("Sending money failed");
    //     }
    //     const result = await response.json();
    //     console.log(result);
    //     return navigate("/balance", {
    //       state: {
    //         transactionInfo: {
    //           date: new Date(),
    //           email: data.email,
    //           type: "Sending",
    //         },
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Error sending money:", error);
    //   }
    // } else {
    //   alert("Please fill in all fields.");
    // }
  };

  return (
    <div>
      <Header pageName="Send" />

      <div className="content-block">
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          //   onChange={handleInputChange}
        />
        <Field
          label="Sum"
          type="sum"
          name="sum"
          placeholder="$"
          //   onChange={handleInputChange}
        />
        <Button
          onClick={handleSendMoney}
          text="Send"
          className="button--primary"
        />
      </div>
    </div>
  );
};

export default SendPage;
