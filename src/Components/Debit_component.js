import '../App.css';
import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';
import Navbar from './Navbar';

function Debit()
{
    const[date, set_date] = useState("")
    const[amount, set_amount] = useState("")
    const[category, set_category] = useState("")
    const[savings, set_savings] = useState(1000)
    const[debit, set_debit] = useState([{}]);
    const[expenditure,set_expenditure] = useState("");
    const[submit_response, set_submit_response] = useState("");
    const[icon,set_icon] = useState("");
   
    useEffect(() => {
        total_debit();
    }, [])


    function total_debit()
    {
        let debit_statement = fetch('http://localhost:4000/total_debits').then(function(response) {
            return response.text();
          }).then(function(data) {
            console.log(data); // this will be a string
            set_expenditure(data);
        });
        

    }

    function myfunc(e)
    {
        set_amount(e);
        var save = document.getElementById("Savings_amount")
        var amt = savings - e;
        //save.innerHTML = amt;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        var failure_list = document.getElementById('failure_submit_icon');
        var success_list = document.getElementById('failure_submit_icon');
        var debit_response = document.getElementById('debit_response');

        failure_list.innerHTML = "";
        success_list.innerHTML = "";
        debit_response.style.color = "";

        if(e.target.date.value == "" || e.target.amount.value=="" || e.target.category.value=="")
        {
            set_submit_response("Please fill all the fields");
            //alert("ho");
            failure_list.innerHTML += `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
            </svg>`;
            document.getElementById("submitModal").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
            debit_response.style.color = "red";
            return false;
        }

        let result = await fetch(
            'http://localhost:4000/insert', {
                method: "post",
                body: JSON.stringify({ date, amount, category}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            console.warn(result);
            set_submit_response("Submitted successfully");
            document.getElementById("submitModal").style.backgroundColor = "green";
            if (result) {
                //alert("Data saved succesfully");
                set_date("");
                set_amount("");
                set_category("");
                set_savings(savings);
                document.getElementById('my_form').reset();
        }
        //document.getElementById("submitModal").style.backgroundColor = "";
        total_debit();
        success_list.innerHTML += `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
        <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>`;
        debit_response.style.color = "green";

    }
    function viewfunc()
    {
        document.getElementById('debits').style.display = 'block';
        
        let result2 = fetch(
            'http://localhost:4000/expense')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                set_debit(data);
            })
            .catch(err => {
                console.log(err);
            })
            
    }

    function displaydate(dte)
    {
        console.log(dte);
        var date = new Date(dte);
        var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        console.log([date.getFullYear(), mnth, day].join("-"));
        var dte = [date.getFullYear(), mnth, day].join("-");
        return(dte);
    }
    return(
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="App.css"></link>
            </head>
            <body className='debit_page home_body'>
            <Navbar />
            <div className='container-fluid myclass center-screen'>
                <form id='my_form' onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="date" className='credit_form'>Date</label>
                        <input type="date" class="form-control" id="date" placeholder="Date" onChange={(e) => {set_date(e.target.value)}}></input>
                    </div>
                    <div class="form-group">
                        <label for="number" className='credit_form'>Amount</label>
                        <input type="number" class="form-control" id="amount" placeholder="0" min="0" onChange={(e) => {myfunc(e.target.value)}}></input>
                    </div>
                    <div class="form-group">
                        <label for="category" className='credit_form'>Select Category :</label>
                        <select class="form-control" id="category"  onChange={(e) => {set_category(e.target.value)}}>
                            <option>Click to select your category : </option>
                            <option value="Travel">Travel</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Food">Food</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary glow-on-hover" data-bs-toggle="modal" data-bs-target="#submitModal" onSubmit={myfunc}>Submit</button>
                    <button type="submit" class="btn btn-primary glow-on-hover" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={viewfunc}>View</button>
                    <div className='centre-text'>
                        <h1 id="Savings_amount">{expenditure}</h1>
                    </div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">{date}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                    <table id='debits' class="table table-hover table-dark center">
                                        <thead>
                                        <tr>
                                            <th scope='col'>Date</th>
                                            <th scope='col'>Amount</th>
                                            <th scope='col'>Category</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                debit.map(i=>{
                                                    return(
                                                        <tr>
                                                            
                                                            <td>{displaydate(i.date)}</td>
                                                            <td>{i.category}</td>
                                                            <td>{i.amount}</td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        </tbody>
                                    </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="submitModal" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">{date}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div id="success_submit_icon"></div>
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

export default Debit;