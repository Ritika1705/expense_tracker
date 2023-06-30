import '../App.css';
import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';
import Navbar from './Navbar';
import Popup from 'reactjs-popup';

function Daily_Savings()
{
    const[daily_savings,set_daily_savings] = useState("");
    const[date, set_date] = useState();
    const[submit_response, set_submit_response] = useState("");

    const handleSubmit = async(e) => {

        e.preventDefault();
        var failure_list = document.getElementById('failure_submit_icon');
        var response = document.getElementById('debit_response');

        failure_list.innerHTML = "";
        response.style.color = "";

        console.log(e.target.date.value);
        if(e.target.date.value == "")
        {
            
            set_submit_response("Date field cannot be empty");
            set_date("");
            //alert("ho");
            failure_list.innerHTML += `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
            </svg>`;
            //document.getElementById("submitModal").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
            response.style.color = "red";
            document.getElementById("exampleModal").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
            return false;
        }
        document.getElementById("exampleModal").style.backgroundColor = "";
        var parameter = e.target.date.value;
        set_date(parameter);
        const d = new Date(parameter);
        let text = d.toISOString();
        console.log(text);
        let daily_savings = fetch('http://localhost:4000/daily_spendings?date=' + text).then(function(response) {
            return response.text();
        }).then(function(data) {
            console.log(data); // this will be a string
            //alert('hello');
            set_submit_response(data);
        });
    

        document.getElementById("my_form").reset();
        
    }
    return(
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <link rel="stylesheet" href="App.css"></link>
            </head>
            <body className='home_body'>
            <Navbar />
               
                        <div class="inner">
                            <form id='my_form' onSubmit={handleSubmit}>
                                <div class="form-group ">
                                    <label for="date" className='credit_form'>Date</label>
                                    <input type="date" class="form-control" id="date" placeholder="Date"></input>
                                </div>
                            
                                <button type="submit" class="btn btn-primary glow-on-hover" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">{date}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div id="failure_submit_icon"></div>
                                                <p id="debit_response">{submit_response}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
            </body>
            
        </>
    )
}

export default Daily_Savings;