import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import UploadImage from "./components/uploadImage";


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <div className="outer">
      <div className="inner">
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/uploadImage" component={UploadImage} />
        
      </div>
    </div>
  </Switch>
);

export default Routes;
