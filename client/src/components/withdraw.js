import React from "react";
import Card from "./context";
import {UserContext} from "./context";
import HandleMsg from "./context";
import HandleWrong from "./context";

function HandleMsg(props){
    return(
    <>
        <h5>{props.message}</h5>
        <br/>
        <h5>{`Your new balance is ${props.balance}`}</h5>
        <button type="submit"
            className="btn btn-light"
            onClick={() => {props.setShow(true);}}>{props.return}
        </button>
    </>)
}

function HandleWrong(props){
    return(
        <>
            <h5>{props.message}</h5>
            <button type="submit"
                className="btn btn-light"
                onClick={() => {
                    props.setShow(true)
                    props.setWrong(false)
                    }}>{props.return}
            </button>
        </>)
}


function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [wrong, setWrong] = React.useState(false);
  const [status, setStatus] = React.useState("");
  let currentUser = React.useContext(UserContext);
  const [activeUser, setActiveUser] = React.useState(currentUser.user);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [balance, setBalance] = React.useState(null);

  return (
      <Card
          bgcolor="primary"
          header="Withdraw"
          activeUser={activeUser}
          status={status}
          body={
              wrong ? (
                  <HandleWrong
                      setShow={setShow}
                      setWrong={setWrong}
                      message={"Email or Amount Unknown"}
                      return={"Return to Withdraw"}
                  />
              ) : show ? (
                  <WithdrawForm
                      setShow={setShow}
                      setWrong={setWrong}
                      activeUser={activeUser}
                      setLoggedIn={setLoggedIn}
                      loggedIn={loggedIn}
                      setBalance={setBalance}
                  />
              ) : (
                  <HandleMsg
                      setShow={setShow}
                      message={"Success!"}
                      balance={balance}
                      return={"return to Withdraw"}
                  />
              )
          }
      />
  );
}

function WithdrawForm(props) {
  const [amount, setAmount] = React.useState(0);
  let currentUser = React.useContext(UserContext);
  const email = currentUser.user;
  if (props.activeUser !== "Not Logged In") {
      props.setLoggedIn(true);
  }

  function handle() {
      console.log(email, amount);
      const url = `/account/withdraw/${email}/${amount}`;
      (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
          props.setBalance(data.value.balance)
          currentUser.balance = data.value.balance;
          console.log(currentUser.balance);
      })();
      props.setShow(false);
  }

  return (
      <>
          Amount
          <br />
          <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
          />
          <br />
          {props.loggedIn ? (
              <button
                  type="submit"
                  className="btn btn-light"
                  onClick={handle}
              >
                  Withdraw
              </button>
          ) : (
              <>
                  <button
                      type="submit"
                      className="btn btn-light"
                      onClick={handle}
                      disabled
                  >
                      Withdraw
                  </button>
                  <br />
                  Login to use the Withdraw Feature
              </>
          )}
      </>
  );
}

export default Withdraw