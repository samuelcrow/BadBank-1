import React from "react";
import Card from "./context";
import {UserContext} from "./context";

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

function Deposit() {
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
          header="Deposit"
          activeUser={activeUser}
          status={status}
          body={
              wrong ? (
                  <HandleWrong
                      setShow={setShow}
                      setWrong={setWrong}
                      message={"Email or Amount Unknown"}
                      return={"Return to Deposit"}
                  />
              ) : show ? (
                  <DepositForm
                      setShow={setShow}
                      setWrong={setWrong}
                      setStatus={setStatus}
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
                      return={"Return to Deposit"}
                  />
              )
          }
      />
  );
}

function DepositForm(props) {
  const [amount, setAmount] = React.useState(0);
  let currentUser = React.useContext(UserContext);
  const email = currentUser.user;
  if (props.activeUser !== "Not Logged In") {
      props.setLoggedIn(true);
  }

  function handle() {
      fetch(`/account/deposit/${email}/${amount}`)
          .then((response) => response.text())
          .then((text) => {
              try {
                  const data = JSON.parse(text);
                  props.setStatus(JSON.stringify(data.value));
                  props.setShow(false);
                  console.log("JSON:", data);
                  props.setBalance(data.value.balance + Number(amount))
                  currentUser.balance = data.value.balance;
                  console.log(currentUser.balance);
              } catch (err) {
                  props.setStatus("Deposit failed");
                  console.log("err:", text);
              }
          });
          
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
                  Deposit
              </button>
          ) : (
              <>
                  <button
                      type="submit"
                      className="btn btn-light"
                      onClick={handle}
                      disabled
                  >
                      Deposit
                  </button>
                  <br />
                  Login to use the Deposit Feature
              </>
          )}
      </>
  );
}


export default Deposit