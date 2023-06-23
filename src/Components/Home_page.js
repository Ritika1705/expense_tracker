import '../App.css';
import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home()
{
    const navigate = useNavigate();
    return(
        <>
            <button type="submit" class="btn btn-primary" onClick={() => navigate("/Credit")}>Credit</button>
            <button type="submit" class="btn btn-primary" onClick={() => navigate("/Debit")}>Debit</button>
        </>
    )
}

export default Home;