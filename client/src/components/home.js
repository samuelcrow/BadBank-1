import Card from "./context";
import bankImg from './bank.png'

function Home(){
  return (
  
    <Card
      txtcolor="black"
      header="DarkBank Main Lobby"
      title="Welcome to the DarkBank"
      text="Please create a Dark account and enjoy our services."
      body={(<img src={bankImg} className="img-fluid" alt="Responsive image"/>)}
    />

   
  );  
}

export default Home