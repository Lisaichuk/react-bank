import React from "react";
import {useNavigate} from "react-router-dom";
import "./index.css";
import Wrapper from "../../commonElements/wrapper/wrapper";
import Button from "../../commonElements/button/button";
import bitcoin from "../../img/bitcoin.svg";

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleSignIn = () => {
        navigate("/signin");
    };

    return (

        <Wrapper>
            <div className="welcome__page">
                <div className="main__block">
                    <div className="welcoming">
                        <h1>Hello!</h1>
                        <span>Welcome to bank app</span>
                    </div>
                </div>

                <div className="action__block">

                    <Button
                        onClick={handleSignUp}
                        text="Sign Up"
                        className="button--primary"
                    />
                    <Button
                        onClick={handleSignIn}
                        text="Sign In"
                        className="button--secondary"
                    />
                </div>

                <img className="logo" src={bitcoin} alt="Bitcoin logo"/>
            </div>
        </Wrapper>
    );
}
export default WelcomePage;