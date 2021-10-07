import React from "react";
import Card from "./context";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import {UserContext} from './context';

function Login() {
  const [show, setShow] = React.useState(true);
  const [wrong, setWrong] = React.useState(false);
  const [status, setStatus] = React.useState("");
  let currentUser = React.useContext(UserContext);
  const [activeUser, setActiveUser] = React.useState(currentUser.user);

  return (
      <Card
          bgcolor="primary"
          header="Login"
          activeUser={activeUser}
          status={status}
          body={
              wrong ? (
                  <LoginWrong setShow={setShow} setWrong={setWrong} />
              ) : show ? (
                  <LoginForm
                      setShow={setShow}
                      setWrong={setWrong}
                      setActiveUser={setActiveUser}
                  />
              ) : (
                  <LoginMsg setShow={setShow} setWrong={setWrong} />
              )
          }
      />
  );
}

function LoginMsg(props) {
  return (
      <>
          <h5>Success</h5>
          <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                  props.setShow(true);
              }}
          >
              Log into a different account
          </button>
      </>
  );
}

function LoginWrong(props) {
  return (
      <>
          <h5>Password or Email unknown</h5>
          <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                  props.setShow(true);
                  props.setWrong(false);
              }}
          >
              Return to Login
          </button>
      </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let currentUser = React.useContext(UserContext);
  const auth = firebase.auth();
  function handle() {
      auth.signInWithEmailAndPassword(email, password)
          .then(() => {
              console.log(email, password);
              const url = `/account/login/${email}/${password}`;
              currentUser.user = email;
              async () => {
                  var res = await fetch(url);
                  console.log(res);
                  var data = await res.json();
                  console.log(data);
                  if (data) {
                      props.setShow(false);
                  } else {
                      props.setWrong(true);
                  }

                  currentUser.balance = data.balance;
              };
              props.setActiveUser(email);
          })
          .catch((error) => {
              console.log(error);
          });
  }

  function logOut() {
      auth.signOut()
          .then(() => {
              currentUser.user = "Not Logged In";
              props.setActiveUser(currentUser.user);
          })
          .catch((error) => {
              console.log("something went wrong " + "error: " + error);
          });
  }

  return (
      <>
          Email address
          <br />
          <input
              type="input"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
          Password
          <br />
          <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
          <button type="submit" className="btn btn-light" onClick={handle}>
              Login
          </button>
          <button
              type="submit"
              className="btn btn-light"
              style={{ float: "right" }}
              onClick={logOut}
          >
              Logout
          </button>
      </>
  );
}


export default Login