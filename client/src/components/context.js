import React from 'react'
export const UserContext = React.createContext(null);

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

function BalanceMsg(props){
    return(
    <>
        <h5>{props.message}</h5>
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

export default (Card, HandleMsg, BalanceMsg, HandleWrong);