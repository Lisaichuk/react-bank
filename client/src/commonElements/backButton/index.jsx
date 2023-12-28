import "./index.css";
import {useNavigate} from "react-router-dom";
import back from "../../img/back-button.svg";

const BackButton = () => {
    const navigate = useNavigate();
    const backButton = () => {
        navigate(-1);
    };

    return (
        <div className="back-button" onClick={backButton}>
            <img src={back} alt="<" width="24" height="24"/>
        </div>
    );
};

export default BackButton;
