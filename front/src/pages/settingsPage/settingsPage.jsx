import React, {useContext, useState} from "react";
import "./index.css";

import Wrapper from "../../components/wrapper/wrapper";
import Header from "../../components/header/header";
import Field from "../../components/field";
import Button from "../../components/button/button";
import authContext, {exit, setUser} from "../../contexts/authContext";

const SettingsPage = () => {
    const {dispatch} = useContext(authContext);

    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangeEmail = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/changeEmail", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password: oldPassword}),
            });

            if (!response.ok) {
                throw new Error("Failed to change email");
            }

            const result = await response.json();

            dispatch(setUser(result.user))
            alert("Email changed successfully");
        } catch (error) {
            console.error("Error changing email:", error);
            alert("Failed to change email");
        }
    };
	
    const handleChangePassword = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/changePassword", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({oldPassword,newPassword}),
            });

            if (!response.ok) {
                throw new Error("Failed to change email");
            }

            const result = await response.json();

            dispatch(setUser(result.user))
            alert("Password changed successfully");
        } catch (error) {
            console.error("Error changing email:", error);
            alert("Failed to change email");
        }
    };

    const handlePasswordButtonClick = () => {
        handleChangePassword(newPassword);
    };

    const handleLogout = () => {
        dispatch(exit())
    };

    return (
        <Wrapper>
            <React.Fragment>
                <Header pageName="Settings"/>
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
                        onClick={() => handleChangeEmail()}
                    />
                    <hr className="divider"/>
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
                    <hr className="divider"/>
                    <Button
                        text="Log Out"
                        className="button--danger"
                        onClick={handleLogout}
                    />
                </div>
            </React.Fragment>
        </Wrapper>
    );
};

export default SettingsPage;
