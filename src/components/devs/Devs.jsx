import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Devs.css';
import { toast } from 'react-toastify';
import { RiDeleteBinLine } from 'react-icons/ri';
import swal from 'sweetalert';
import { DEVS_DATA_CREATED, DEVS_DATA_DELETE } from '../../Reduser/devsType';

const Devs = ({ devs, dispatch }) => {
  const [activation, setActivation] = useState(false);
  const [input, setInput] = useState({
    name: '',
    location: '',
    age: '',
    skill: '',
    photo: ''
  });

  // Handle form submission
  const handleSubmitdata = async (e) => {
    e.preventDefault();
    if (!input.name || !input.location || !input.age || !input.skill) {
      toast.error("All fields are required!");
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:5050/devs", input);
        toast.success("Your data was created successfully! 🥰");
        dispatch({ type: DEVS_DATA_CREATED, payload: response.data });
        setInput({ name: '', location: '', age: '', skill: '', photo: '' });

     
          setActivation(true);
         
      } catch (error) {
        toast.error("Failed to create data!");
        console.error("Error:", error);
      }
    }
  };
  useEffect(()=>{
    setTimeout(()=>{
      setActivation(false)
    },5000)
  },activation ==false)
  setTimeout(()=>{
    setActivation(false)
  },10000)
  // Handle input changes
  const handleChangeInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const warning = window.confirm("Are you sure?");
    if (warning) {
      try {
        await axios.delete(`http://localhost:5050/devs/${id}`);
        dispatch({ type: DEVS_DATA_DELETE, payload: id });
        toast.error("Your data was deleted!");
      } catch (error) {
        toast.error("Failed to delete data!");
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="data_create">
          <div className="heading">
            <h1 className='heading'>Developer Data</h1>
          </div>
          <form onSubmit={handleSubmitdata}>
            <input 
              className="border" 
              type="text" 
              placeholder='Name'
              value={input.name}
              name='name'
              onChange={handleChangeInput}
            />
            <input 
              type="text" 
              placeholder='Location'
              value={input.location}
              name='location'
              onChange={handleChangeInput}
            />
            <input 
              type="text" 
              placeholder='Age'
              value={input.age}
              name='age'
              onChange={handleChangeInput}
            />
            <input 
              type="text" 
              className='border-2 border-gray-700'
              placeholder='Skill'
              value={input.skill}
              name='skill'
              onChange={handleChangeInput}
            />
            <input 
              type="text" 
              className='border-2 border-gray-700'
              placeholder='Photo'
              value={input.photo}
              name='photo'
              onChange={handleChangeInput}
            />
            <button type='submit'>Create</button>
          </form>
        </div>

        {/* Data display */}
        <ul>
          {devs?.reverse().map((item) => (
            <li className='close' key={item.id}>
              <img src={item.photo} alt={`${item.name}'s photo`} />
              <span className={activation ? "activate" :"unactivet"  }></span>
              {item.name}
              <button onClick={() => handleDelete(item.id)}>
                <RiDeleteBinLine />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Devs;
