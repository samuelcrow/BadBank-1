import Card from "./context";
import bankImg from './bank.png'

function Home(){
  return (
  
    <div className={"card mb-3 bg-primary text-white"} style={{maxWidth: "40rem"}}>
        <div className="card-header">{"Bad Bank"}</div>
        <div className="card-body">
        <img src={bankImg} alt={"Picture of a Bad Bank"}/>
        </div>
    </div>

   
  );  
}

export default Home