import React from "react";
import { useNavigate } from "react-router";
import "./index.css";

import Button from "../../component/button";
import bitcoin from "../../img/bitcoin.svg";

function WelcomePage(): React.ReactElement {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
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

      <img className="logo" src={bitcoin} alt="Bitcoin logo" />
    </div>
  );
}

export default WelcomePage;
