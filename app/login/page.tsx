"use client";

import React from 'react';
import { TextFieldElement, PasswordElement } from "react-hook-form-mui";
import {
  FormWrapper,
  FormErrorText,
  FormWrapperProps
} from "../components/form/FormWrapper";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

export const Login = ({
  onLoginSubmit = () => {},
  onRegisterRedirect,
  title = "Member Login",
  description = <DefaultDescription />,
  submitButtonText = "Login",
  defaultEmail,
  defaultPassword,
  minPasswordLength = 10,
  minSpecialCharLength = 2,
  minNumberLength = 2,
  closeModal = () => {},
  ...props
}: LoginProps) => {

  const [creds, setCreds] = React.useState({});

  const handleLogin = async () => {
    const {
      data: loginResponse
    } = await axios.post(
      '/api/login',
      creds
    );
    return loginResponse;
  };

  const {
    error,
    data,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['login'],
    queryFn: handleLogin,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const isRequestLoading = [
    isFetching,
    isLoading
  ].some((s: any) => (s))

  React.useEffect(() => {
    if (Object.keys(creds).length === 0) {
      return;
    }

    refetch();
  }, [creds]);

  const defaultValues = {
    email: defaultEmail,
    password: defaultPassword,
  };

  const onSuccess = (values: any) => {
    onLoginSubmit(values);
    setCreds((prevCreds: any) => ({
      ...prevCreds,
      ...values
    }));
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  if (!description) {
    description = (
      <DefaultDescription onRegisterRedirect={onRegisterRedirect} />
    );
  }

  return (
    <FormWrapper
      onSuccess={onSuccess}
      onCancel={onCancel}
      defaultValues={defaultValues}
      title={title}
      description={description}
      submitButtonText={submitButtonText}
      isLoading={isRequestLoading}
      {...props}
    >

      <FormErrorText
        message={'Invalid email or password.  Please try again.'}
        isError={isError}
      />

      <TextFieldElement
        label="Email"
        name="email"
        type={"email"}
        validation={{
          required: "Email is required",
        }}
        disabled={isRequestLoading}
      />

      <PasswordElement
        label="Password"
        name="password"
        type={"password"}
        helperText={`Min length: ${minPasswordLength} | Min special characters: ${minSpecialCharLength} | Min numbers: ${minNumberLength}`}
        disabled={isRequestLoading}
      // validation={{
      //   required: "Password is required",
      //   minLength: {
      //     value: minPasswordLength,
      //     message: `Minimum password length: ${minPasswordLength}`,
      //   },
      //   validate: {
      //     minSpecialChar: (p: string) =>
      //       matchPasswordValidate({
      //         p,
      //         minNumber: minSpecialCharLength,
      //         regex: specialCharacterRegex,
      //         message: `Min special characters: ${minSpecialCharLength}`,
      //       }),
      //     minNumber: (p: string) =>
      //       matchPasswordValidate({
      //         p,
      //         minNumber: minNumberLength,
      //         regex: numberRegex,
      //         message: `Min numbers: ${minNumberLength}`,
      //       }),
      //   },
      // }}
      />
    </FormWrapper>
  );
};

const DefaultDescription = ({ onRegisterRedirect = () => {} }: any) => {
  const clickHandler = (event: any) => {
    event.preventDefault();
    onRegisterRedirect();
  };

  return (
    <div className="login-description">
      Don&apos;t have an account? &nbsp;&nbsp;
      <div style={{}} onClick={clickHandler}>
        Click Here
      </div>
    </div>
  );
};

const specialCharacterRegex = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~/]/g;
const numberRegex = /[0-9]/g;
const matchPasswordValidate = ({
  p = "",
  message = "",
  regex,
  minNumber,
}: any) => {
  const validArray = p.match(regex) || [];
  const isValid = validArray.length >= minNumber;
  return isValid ? true : message;
};

export interface LoginProps
  extends Omit<FormWrapperProps, "onSuccess" | "defaultValues"> {
  /**
   * Handler when Login form is submitted
   */
  onLoginSubmit?: any;
  // onLoginSubmit?: (formValues: any) => void;
  /**
   * on User redirect to "Register" page
   */
  onRegisterRedirect?: () => void;
  /**
   * Minimum password length allowed
   */
  minPasswordLength?: number;
  /**
   * Minimum special characters to include in password
   */
  minSpecialCharLength?: number;
  /**
   * Minimum special characters to include
   */
  minNumberLength?: number;
  /**
   * Populate default username field
   */
  defaultEmail?: string;
  /**
   * Populate default password field
   */
  defaultPassword?: string;
  /**
   * Injected if parent is a Modal
   */
  closeModal?: Function;
}

export default Login;
