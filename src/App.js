import './App.css';
import './input.css'
import {handleResponse} from './responsehandler'
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [user1notfound, setUser1NotFound] = useState(false);
  const [user2notfound, setUser2NotFound] = useState(false);
  const [response1Result, setResponse1Result] = useState(null);
  const [response2Result, setResponse2Result] = useState(null);

  
  


  const handleUser1Change = (event) => {
    setUser1NotFound(false)
    setUser1(event.target.value);
  }

  const handleUser2Change = (event) => {
    setUser2NotFound(false)
    setUser2(event.target.value);
  }

  const fetchData = async () => {
    console.log("User 1:", user1);
    console.log("User 2:", user2);
     try {
      
      // Make your API call here using the user1 and user2 variables
      let response1 = await axios.get(`https://faisal-leetcode-api.cyclic.app/${user1}`);
      
      if ('errors' in response1.data) {
        // 'errors' field exists in response1.data
        console.log(response1.data.errors);
        setUser1NotFound(true)
        return;
      } 
  
    
     
      
      let response2 = await axios.get(`https://faisal-leetcode-api.cyclic.app/${user2}`);
      if ('errors' in response2.data) {
        // 'errors' field exists in response1.data
        // console.log("no user is present with this username ")
        console.log(response2.data.errors);
        setUser2NotFound(true)
        return;
      } 
  
      console.log(response2.data)

      // Inside the fetchData function
     const response1Data = response1.data;
     const response2Data = response2.data;
     const processedResponse1 = handleResponse(response1Data);
     const processedResponse2 = handleResponse(response2Data);
     setResponse1Result(processedResponse1);
     setResponse2Result(processedResponse2);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <h1>uahfvs</h1>
      <input id="user1" placeholder="Enter first username" value={user1} onChange={handleUser1Change} />
      <input id="user2" placeholder="Enter second username" value={user2} onChange={handleUser2Change} />
      <button onClick={fetchData}>Submit</button>
      <br></br>

      {user1notfound && <span  className='userNotFound'> <span>{user1}</span>    is not present</span> }
      <br></br>
      {user2notfound && <span className='userNotFound'><span>{user2}</span>    is not present</span> }
      <div>{response1Result}</div>
      <div>{response2Result}</div>

    </>
  );
}

export default App;
