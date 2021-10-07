import React from 'react'
export const UserContext = React.createContext(null);

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }



  return (
    <div className={classes()} style={{maxWidth: "18rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {typeof props.body.length==='number' && props.body.length>0 ? 
          <ul>
            {props.body.map(item => {
              return (
                <li key={item._id}>{item.name} - {item.email} - {item.balance}</li>
              )
            })}
          </ul>
        : props.body}
        {typeof props.body==='string'? props.body : null}
        {props.status && (<div id='createStatus'>
          {typeof props.status==='object'?
            Object.entries(props.status)
              .filter(([key,val])=>!['password'].includes(key) && !['_id'].includes(key))
              .map(([key,val])=>{
              console.log('OBJ:', key, val)
              return (
          
                <li key={key}>{key}: {val}</li>
              )
            })
          : null}
        
        
        </div>)}
      </div>
    </div>      
  );    
}

export default Card