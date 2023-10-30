import { useState, useEffect, useCallback } from "react";
import "./index.css";

import show from "../../img/password-show.svg";
import hide from "../../img/password-hide.svg";

interface FieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  maxLength?: number;
  formType?: "signIn" | "signUp";
  onChange?: (value: string, isValid: boolean) => void;
}

const Field: React.FC<FieldProps> = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  formType,
  maxLength,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  const FIELD_ERROR = {
    IS_EMPTY: "Please fill in all the fields",
    EMAIL: "Please enter a valid email address",
    PASSWORD:
      "Password must be at least 8 characters long and include at least one digit, one lowercase and one uppercase letter",
    USER_EXIST: "User with this email already exists",
  };

  const validate = useCallback(
    (value: string): boolean => {
      if (type === "email") {
        const REG_EXP_EMAIL = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,}$/;
        return REG_EXP_EMAIL.test(value);
      }

      if (type === "password") {
        const REG_EXP_PASSWORD =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return REG_EXP_PASSWORD.test(value);
      }

      return true;
    },
    [type]
  );

  const getError = useCallback((): string | undefined => {
    if (formType === "signUp" && type === "password") {
      if (!validate(inputValue)) {
        return FIELD_ERROR.PASSWORD;
      }
    } else if (formType === "signUp" && type === "email") {
      if (!validate(inputValue)) {
        return FIELD_ERROR.EMAIL;
      }
    }
    return undefined;
  }, [
    formType,
    inputValue,
    type,
    validate,
    FIELD_ERROR.PASSWORD,
    FIELD_ERROR.EMAIL,
  ]);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputValid = validate(value);

    setIsValid(inputValid);
    setIsFocus(false);
  };

  const handleFocus = () => {
    setIsFocus(true);
    setHasError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputValid = validate(value);

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
          maxLength={maxLength}
          value={inputValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleInputChange}
          className="field__input"
          required
        />
        {type === "password" && (
          <div onClick={togglePasswordVisibility} className="field__icon">
            {showPassword ? (
              <img src={show} alt="show" />
            ) : (
              <img src={hide} alt="hide" />
            )}
          </div>
        )}
        {!isValid && !isFocus && (
          <div
            className="error-text"
            style={{ top: hasError ? "calc(100% + 8px)" : "0" }}
          >
            {getError()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;
