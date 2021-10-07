const user_data = JSON.parse(localStorage.getItem("user_data"));

function AlertBar({alertData}) {
  return (
    <div className="AlertBar">
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Welcome, {user_data && user_data.name}!</strong> Please contact customer service if you have any questions
        regarding your DarkBank account at : 202-555-0132. 
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={e => {

        }}>
          {/* <span aria-hidden="true">&times;</span> */}
        </button>
      </div>
    </div>
  )
}

export default AlertBar