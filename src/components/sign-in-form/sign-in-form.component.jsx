import { useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocmentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    (async () => {
      const respons = await getRedirectResult(auth);
      if (respons) {
        await createUserDocmentFromAuth(respons.user);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocmentFromAuth(user);
  };

  const resetFormFeields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSudmit = async (event) => {
    event.preventDefault();

    try {
      const respons = await signInUserWithEmailAndPassword(email, password);
      console.log(respons);
      resetFormFeields();
    } catch (error) {
      if (
        error.code == "auth/wrong-password" ||
        error.code == "auth/user-not-found"
      ) {
        alert("incorrect password or email");
      }
      console.log("user creation an erorr", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>have an accunt?</h2>
      <span>sign in with your email and password</span>
      <form onSubmit={handleSudmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={"google-sign-in"}
            onClick={logGoogleUser}
          >
            log in with google Popup
          </Button>
          <Button
            type="button"
            buttonType={"google-sign-in"}
            onClick={signInWithGoogleRedirect}
          >
            log in with google Redirect
          </Button>
        </div>
      </form>
    </div>
  );
}
