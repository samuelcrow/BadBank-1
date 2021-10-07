import React from "react";
import NavBar from "./components/navbar";
import { UserContext } from "./components/context";
import { HashRouter, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import AllData from "./components/alldata";
import Withdraw from "./components/withdraw";
import Balance from "./components/balance";

function App() {
    return (
        <HashRouter>
        <div>
            <NavBar/>
            <UserContext.Provider value={{user:'Not Logged In'}}>
                <div className="container" style={{padding: "20px"}}>
                    <Route path="/" exact component={Home}/>
                    <Route path="/createAccount" component={CreateAccount}/>
                    <Route path="/allData" component={AllData}/>
                    <Route path="/deposit" component={Deposit}/>
                    <Route path="/withdraw" component={Withdraw}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/balance" component={Balance}/>
                </div>
            </UserContext.Provider>
        </div>
        </HashRouter>
    )
}

export default App;
