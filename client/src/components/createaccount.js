import React from "react";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import {UserContext} from './context';

function Card(props){
  function classes(){
      const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
      return 'card mb-3' + bg + txt;
  }

  return (
      <div className={classes()} style={{maxWidth: "30rem"}}>
          <div className="card-header">{props.header}</div>
          <div className="card-header text-right">{props.activeUser}</div>
          <div className="card-body">
              {props.title && (<h5 className="card-title">{props.title}</h5>)}
              {props.text && (<p className="card-text">{props.text}</p>)}
              {props.body}
              {props.status && (<div id='createStatus'>{props.status}</div>)}
          </div>
      </div>
  );
}


function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
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