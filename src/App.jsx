
import { useEffect, useReducer } from 'react'
import './App.css'

import axios from "axios"
import { initialState } from './Reduser/initialstate.js'
import { DEVS_DATA_LOAD } from './Reduser/devsType'
import Devs from './components/devs/Devs'
import devReduser from './Reduser/devsReduser.js'


function App() {
  const [devs, dispatch] = useReducer(devReduser, initialState);

  const getDevsdata = async () => {
    const response = await axios.get("http://localhost:5050/devs");
    dispatch({ type: DEVS_DATA_LOAD, payload: response.data });
  };
  
  

useEffect(()=>{
  getDevsdata()
},[])

  return (
    <>
<Devs devs={devs} dispatch={dispatch} />
</>
  )
}

export default App
