import React from "react";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import {UserContext} from './context';
import Card from "./context";


function CreateAccount(){
    const currentUser = UserContext;
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [activeUser, setActiveUser] = React.useState(currentUser.user);

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      activeUser={activeUser}
      body={show ? 
        <CreateForm 
        setShow={setShow}
        setActiveUser={setActiveUser}
        setStatus={setStatus}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const currentUser = UserContext;
  console.log(currentUser);

  




  function handle() {
    const auth = firebase.auth();
    console.log(name, email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const url = `/account/create/${name}/${email}/${password}/${userCredential.user.uid}`;
            (async () => {
                var res = await fetch(url);
                console.log(res);
                var data = await res.json();
                console.log(data);
            })();
            props.setShow(false);
            props.setActiveUser(email);
            currentUser.user = email;
            currentUser.balance = 0;
        })
        .catch((error) => {
            // Function if incorrectly signed in
            var errorMessage = `Error Message: ${error.message}`;
            console.log(errorMessage);
            props.setStatus(errorMessage);
            setTimeout(() => props.setStatus(""), 4000);
            // Clear the user inputs
            setEmail("");
            setPassword("");
        });
}  

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}

export default CreateAccount