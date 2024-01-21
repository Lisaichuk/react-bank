import {useState, useEffect, useCallback} from "react";
import "./index.css";

import show from "../../img/password-show.svg";
import hide from "../../img/password-hide.svg";


const Field = ({
    label,
    type,
    name,
    placeholder,
    onChange,
    formType,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);

    const FIELD_ERROR = {
        IS_EMPTY: "Please fill in all the fields",
        EMAIL_SIGNUP: "Please enter a valid email address",
        PASSWORD_SIGNUP:
            "Sorry, the password is too simple. Password must be at least 8 characters long and include at least one digit, one lowercase and one uppercase letter",
        PASSWORD_SIGNIN: "Please enter your correct password",
        EMAIL_SIGNIN: "Invalid email address. Please check and try again",
        CODE: "Error. Code must be at least 6 digits",
        USER_EXIST: "User with this email already exists",
    };

    const validate = useCallback((value) => {
        if (value.trim() === "") {
            return false;
        } else if (type === "number") {
            return /^\d{6,}$/.test(value);
        } else if (type === "email") {
            const REG_EXP_EMAIL = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,}$/;
            return REG_EXP_EMAIL.test(value);
        } else if (type === "password") {
            const REG_EXP_PASSWORD =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            return REG_EXP_PASSWORD.test(value);
        } else return true;
    }, [type]);

    const getError = useCallback(() => {
        if (!validate(inputValue)) {
            if (inputValue.trim() === "") {
                return FIELD_ERROR.IS_EMPTY;
            }

            if (formType === "signUp" && type === "password") {
                return FIELD_ERROR.PASSWORD_SIGNUP;
            } else if (formType === "signUp" && type === "email") {
                return FIELD_ERROR.EMAIL_SIGNUP;
            } else if (formType === "signIn" && type === "password") {
                return FIELD_ERROR.PASSWORD_SIGNIN;
            } else if (formType === "signIn" && type === "email") {
                return FIELD_ERROR.EMAIL_SIGNIN;
            } else if (type === "number") {
                return FIELD_ERROR.CODE;
            }
        }
        return undefined;
    },
    [
        formType,
        inputValue,
        type,
        validate,
        FIELD_ERROR.IS_EMPTY,
        FIELD_ERROR.PASSWORD_SIGNUP,
        FIELD_ERROR.EMAIL_SIGNUP,
        FIELD_ERROR.PASSWORD_SIGNIN,
        FIELD_ERROR.EMAIL_SIGNIN,
        FIELD_ERROR.CODE,
    ]
);

    const handleBlur = (e) => {
        const value = e.target.value;
        const inputValid = validate(value);

        setIsValid(inputValid);
        setIsFocus(false);
    };

    const handleFocus = () => {
        setIsFocus(true);
        setHasError(false);
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        let inputValid = validate(value);

        if (type === "number") {
            if (value.length >= 6) {
                value = value.slice(0, 6);
            }
        }

        setInputValue(value);

        if (!isFocus) {
            setIsValid(inputValid);
        }
        if (!hasError) {
            setHasError(!inputValid && value.trim() !== "");
        }
        if (onChange) {
            onChange(value, inputValid);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (!isFocus) {
            const errorText = getError();
            setHasError(!errorText);
        }
    }, [getError, hasError, isFocus]);

    return (
        <div className={`field ${!isValid && !isFocus ? "invalid" : ""}`}>
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <div className="field__wrapper">
                <input
                    name={name}
                    type={
                        type === "password" ? (showPassword ? "text" : "password") : type
                    }
                    placeholder={placeholder}
                    value={inputValue}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onChange={handleInputChange}
                    className="field__input"
                />
                {type === "password" && (
                    <div onClick={togglePasswordVisibility} className="field__icon">
                        {showPassword ? (
                            <img src={show} alt="show"/>
                        ) : (
                            <img src={hide} alt="hide"/>
                        )}
                    </div>
                )}
                {!isValid && !isFocus && (
                    <div
                        className="error-text"
                        style={{top: hasError ? "calc(100% + 8px)" : "0"}}
                    >
                        {getError()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Field;
