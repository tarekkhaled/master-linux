import { useState } from "react";
import { signUserIn } from "../../store/actionCreators";
import { connect } from "react-redux";

function Login({ dispatch }) {
  const [state, setState] = useState({
    username: "",
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
    dispatch(signUserIn(state)).then(({ payload }) => {
      window.location.assign('/uploadImage')
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log in</h3>
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
        Sign in
      </button>
    </form>
  );
}

export default connect()(Login);
