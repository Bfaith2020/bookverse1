import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext"; // Corrected path
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert("Sign-up successful!");
      navigate("/login"); // Redirect to login page after successful sign-up
    } catch (error) {
      setMessage("Failed to sign up. Please try again.");
      console.error(error);
    }
  };

  return (
    <StyledWrapper>
      <form className="form_main" onSubmit={handleSubmit(onSubmit)}>
        <p className="heading">Sign Up</p>
        <div className="inputContainer">
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            id="email"
            className="inputField"
            type="email"
          />
        </div>
        <div className="inputContainer">
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            id="password"
            className="inputField"
            type="password"
          />
        </div>
        {message && <p className="errorMessage">{message}</p>}
        <button id="button" type="submit">
          Sign Up
        </button>
        <div className="loginContainer">
          <p>Already have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form_main {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    padding: 30px 30px 30px 30px;
    border-radius: 30px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.062);
  }

  .heading {
    font-size: 2.5em;
    color: #2e2e2e;
    font-weight: 700;
    margin: 15px 0 30px 0;
  }

  .inputContainer {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inputField {
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid rgb(173, 173, 173);
    border-radius: 30px;
    margin: 10px 0;
    color: black;
    font-size: 0.8em;
    font-weight: 500;
    box-sizing: border-box;
    padding-left: 10px;
  }

  .inputField:focus {
    outline: none;
    border-bottom: 2px solid rgb(199, 114, 255);
  }

  .inputField::placeholder {
    color: rgb(80, 80, 80);
    font-size: 1em;
    font-weight: 500;
  }

  #button {
    position: relative;
    width: 100%;
    border: 2px solid #8000ff;
    background-color: #8000ff;
    height: 40px;
    color: white;
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 30px;
    margin: 10px;
    cursor: pointer;
    overflow: hidden;
  }

  #button:hover {
    background-color: #6f00e6;
  }

  .loginContainer {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .loginContainer p {
    font-size: 0.9em;
    font-weight: 500;
    color: black;
  }

  .loginContainer a {
    font-size: 0.7em;
    font-weight: 500;
    background-color: #2e2e2e;
    color: white;
    text-decoration: none;
    padding: 8px 15px;
    border-radius: 20px;
  }

  .errorMessage {
    color: red;
    font-size: 0.8em;
    margin-bottom: 10px;
  }
`;

export default SignUp;
