import {useState, useEffect} from 'react'
import Card from "./context";

const user_data = JSON.parse(localStorage.getItem("user_data"));

function AllData(){

    const [data, setData] = useState('');    

   useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all', {
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${user_data.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);                
            });

    }, []);

    return (
    <Card
        bgcolor="secondary"
        header="DarkBank Users"
        status={"status"}
        body={data}
          />
    )
    }

    export default AllData