import React, { useState } from "react";
import { useAuth } from "../../component/authRoute";
import { useNavigate } from "react-router-dom";
import "./index.css";

import { Page } from "../../component/page";
import Header from "../../component/header";
import Field from "../../component/field";
import Button from "../../component/button";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangeEmail = async (email: string) => {
    // try {
    //   const response = await fetch("/settings", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to change email");
    //   }
    //   dispatch({ type: "CHANGE_EMAIL", email });
    //   alert("Email changed successfully");
    // } catch (error) {
    //   console.error("Error changing email:", error);
    //   alert("Failed to change email");
    // }
  };

  const handleEmailButtonClick = () => {
    handleChangeEmail(email);
  };

  const handleChangePassword = async (newPassword: string) => {
    // try {
    //   const response = await fetch("/settings", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ newPassword }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to change password");
    //   }
    //   dispatch({ type: "CHANGE_PASSWORD", newPassword });
    //   alert("Password changed successfully");
    // } catch (error) {
    //   console.error("Error changing password:", error);
    //   alert("Failed to change password");
    // }
  };

  const handlePasswordButtonClick = () => {
    handleChangePassword(newPassword);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: state.token }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Page>
      <React.Fragment>
        <Header pageName="Settings" />
        <div className="change__block">
          <h2 className="settings__title">Change email</h2>
          <Field
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your new email"
            onChange={setEmail}
          />
          <Field
            label="Old Password"
            type="password"
            name="password"
            placeholder="Enter your old password"
            onChange={setOldPassword}
          />
          <Button
            text="Save Email"
            className="button--secondary"
            onClick={handleEmailButtonClick}
          />
          <hr className="divider" />
          <h2 className="settings__title">Change password</h2>
          <Field
            label="Old Password"
            type="password"
            name="password"
            placeholder="Enter your old password"
            onChange={setOldPassword}
          />
          <Field
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter your new password"
            onChange={setNewPassword}
          />
          <Button
            text="Save Password"
            className="button--secondary"
            onClick={handlePasswordButtonClick}
          />
          <hr className="divider" />
          <Button
            text="Log Out"
            className="button--danger"
            onClick={handleLogout}
          />
        </div>
      </React.Fragment>
    </Page>
  );
};

export default SettingsPage;
