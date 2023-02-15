import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocmentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-from/sign-up-form.component";
const SignIn = () => {
  useEffect(() => {
    (async () => {
      const respons = await getRedirectResult(auth);
      if (respons) {
        const userDocRef = await createUserDocmentFromAuth(respons.user);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocmentFromAuth(user);
  };

  return (
    <div className="signIn">
      <h1>sign in gage</h1>
      <button onClick={logGoogleUser}>log in with google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        log in with google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
