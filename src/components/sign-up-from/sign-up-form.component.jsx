import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocmentFromAuth,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // console.log(formFields);

  const resetFormFeields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSudmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not math");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocmentFromAuth(user, { displayName });

      resetFormFeields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email alrady in ues");
      } else {
        console.log("user creation an erorr", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>don't have an accunt?</h2>
      <span>sign up with your email and password</span>
      <form onSubmit={handleSudmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          onChange={handleChange}
          type="Text"
          value={displayName}
          required
        />
        <FormInput
          label="Email"
          name="email"
          onChange={handleChange}
          type="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={password}
          required
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={confirmPassword}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
