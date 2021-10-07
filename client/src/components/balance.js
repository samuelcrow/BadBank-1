import React from "react";
import Card from "./context";

function Balance() {
  const [show, setShow] = React.useState(true);
  const [wrong, setWrong] = React.useState(false);
  const [currentBalance, setCurrentBalance] = React.useState(0);
  const [status, setStatus] = React.useState("");
  let currentUser = React.useContext(UserContext);
  const [activeUser, setActiveUser] = React.useState(currentUser.user);
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
      <Card
          bgcolor="primary"
          header="Balance"
          activeUser={activeUser}
          status={status}
          body={
              wrong ? (
                  <HandleWrong
                      setShow={setShow}
                      setWrong={setWrong}
                      message={"Email Unknown"}
                      return={"Return to Balance"}
                  />
              ) : show ? (
                  <BalanceForm
                      setShow={setShow}
                      setWrong={setWrong}
                      setCurrentBalance={setCurrentBalance}
                      currentBalance={currentBalance}
                      activeUser={activeUser}
                      setLoggedIn={setLoggedIn}
                      loggedIn={loggedIn}
                  />
              ) : (
                  <BalanceMsg
                      setShow={setShow}
                      message={`Current Balance is ${currentBalance}`}
                      return={"return to Balance"}
                  />
              )
          }
      />
  );
}

function BalanceWrong(props) {
  return (
      <>
          <h5>Email Unknown</h5>
          <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                  props.setShow(true);
                  props.setWrong(false);
              }}
          >
              Return to Balance
          </button>
      </>
  );
}

function BalanceForm(props) {
  let currentUser = React.useContext(UserContext);
  const email = currentUser.user;
  if (props.activeUser !== "Not Logged In") {
      props.setLoggedIn(true);
  }

  function handle() {
      console.log(email);
      const url = `/account/all/${email}`;
      (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data, data.balance);
          await props.setCurrentBalance(data.balance);
      })();
      props.setShow(false);
  }

  return (
      <>
          {props.loggedIn ? (
              <button
                  type="submit"
                  className="btn btn-light"
                  onClick={handle}
              >
                  Show Balance
              </button>
          ) : (
              <>
                  <button
                  type="submit"
                  className="btn btn-light"
                  onClick={handle}
                  disabled
              >
                  Show Balance
              </button>
                  <br />
                  Login to use the Balance Feature
              </>
          )}
      </>
  );
}

export default Balance