import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInUtil } from "../../utils/cognitoAuth";
import CustomTextField from "~shared-components/CustomTextField/CustomTextField";
import CustomForm from "~shared-components/CustomForm/CustomForm";
import CustomButton from "~shared-components/CustomButton/CustomButton";
import FormWrapper from "~shared-components/shared-styled-components/FormWrapper/FormWrapper";
import LinkContainer from "~shared-components/shared-styled-components/LinkContainer/LinkContainer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email je obavezan.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email nije validan.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Lozinka je obavezna.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    signInUtil(email, password).catch((err) => {
      console.log(err);
      setPasswordError("Neispravan email ili lozinka.");
    });
  };

  return (
    <FormWrapper>
      <h2>Prijava</h2>
      <CustomForm onSubmit={handleLogin}>
        <CustomTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <CustomTextField
          label="Lozinka"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Prijavi se
        </CustomButton>

        <LinkContainer>
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Nemate nalog? Registrujte se
          </Link>
        </LinkContainer>
      </CustomForm>
    </FormWrapper>
  );
}

export default Login;
