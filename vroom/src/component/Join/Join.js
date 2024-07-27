import React, { useState } from 'react';
import "./Join.css";
import logo from '../../assets/images/VROOM_logo1.png';
import { Link } from 'react-router-dom';

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

const Join = () => {
    const [name, setName] = useState("");

    return (
        <div className='JoinPage'>
            <div className='JoinContainer'>
                <img src={logo} alt='logo' />
                <br />
                <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" type='text' id='joinInput' />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">
                    <button onClick={sendUser} className='joinbtn'>JOIN NOW</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
export { user };
