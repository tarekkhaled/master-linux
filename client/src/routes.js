import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <div className="outer">
      <div className="inner">
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    </div>
  </Switch>
);

export default Routes;
