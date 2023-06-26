import '../App.css';
import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Home()
{
    const navigate = useNavigate();
    return(
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="App.css"></link>
            </head>
            <body className='home_body'>
                <Navbar />
                <div class="center-screen">
                    <button type="submit" class="btn btn-primary glow-on-hover" onClick={() => navigate("/Credit")}>Credit</button>
                    <button type="submit" class="btn btn-primary glow-on-hover" onClick={() => navigate("/Debit")}>Debit</button>
                </div>
            </body>
            
        </>
    )
}

export default Home;