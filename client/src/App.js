import React from 'react'
import NavBar from "./components/navbar";
import {UserContext} from './components/context'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import AlertBar from './components/alertbar';
import Login from './components/login';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Deposit from './components/deposit';
import AllData from './components/alldata';
import Withdraw from './components/withdraw';
import Balance from './components/balance';

const useState = React.useState;
const user_data = JSON.parse(localStorage.getItem("user_data"));


const App = () => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertData, setAlertData] = useState("");

  const handleAlert = (data) => {
    setSuccessAlert(true);
    setAlertData(data);
  };

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <UserContext.Provider
          value={{
            users: [
              {
                name: "abel",
                email: "abel@mit.edu",
                password: "secret",
                balance: 100,
              },
            ],
          }}
        >
          {user_data && user_data.token ? <AlertBar alertData={alertData} /> : null}
          <div className="container" style={{ padding: "20px" }}>
            <Route exact path="/" exact component={Home} />
            <Route exact path="/CreateAccount/" component={CreateAccount} />
            <Route
              path="/login/"
              render={(props) => <Login {...props} handleAlert={handleAlert} />}
            />
            <Route path="/deposit/" render={(props) => {
              if(user_data && user_data.token){
                return <Deposit {...props} /> 
              } return <Redirect to="/login" />
            }} />

<Route
              
              path="/alldata/"
              render={(props) => {
                if (user_data && user_data.token) {
                  return <AllData {...props} />;
                }
                return <Redirect to="/login" />;
              }}
            />

            {/* only if there is a token, render the withraw component. Else, redirect to login */}
            <Route
              exact
              path="/withdraw/"
              render={(props) => {
                if (user_data && user_data.token) {
                  return <Withdraw {...props} />;
                }
                return <Redirect to="/login" />;
              }}
            />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route
              path="/balance/"
              render={(props) => {
                if (user_data && user_data.token) {
                  return <Balance {...props} />;
                }
                return <Redirect to="/login" />;
              }}
            />
            
          </div>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App


