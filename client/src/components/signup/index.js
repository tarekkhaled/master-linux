import { useState } from "react";
import { signUserUp } from "../../store/actionCreators";
import { connect } from "react-redux";

function Signup({ dispatch }) {
  const [state, setState] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUserUp(state)).then(({ payload }) => {
      window.location.assign("/uploadImage");
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div className="form-group">
        <label>full name</label>
        <input
          type="text"
          className="form-control"
          placeholder="fullName"
          onChange={handleChange}
          name="fullName"
        />
      </div>

      <div className="form-group">
        <label>email</label>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          onChange={handleChange}
          name="email"
        />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={state.username}
          onChange={handleChange}
          name="username"
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Register
      </button>
      <p className="forgot-password text-right">
        Already registered <a href="/login">log in?</a>
      </p>
    </form>
  );
}

export default connect()(Signup);
