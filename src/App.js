import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

const App = () => {
  return (
    <Fragment className="app">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />}/>
          <Route path="signIn" element={<SignIn />}/>

        </Route>
        
      </Routes>
    </Fragment>
  );
};

export default App;
