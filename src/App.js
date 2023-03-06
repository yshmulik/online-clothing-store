import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
  return (
    <Fragment className="app">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="authentication" element={<Authentication />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
