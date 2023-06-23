import '../App.css';
import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';

function Debit()
{
    const[date, set_date] = useState("")
    const[amount, set_amount] = useState("")
    const[category, set_category] = useState("")
    const[savings, set_savings] = useState(1000)
    const[credit, set_credit] = useState([{}]);
    const[income,set_income] = useState("");

    useEffect(() => {
        total_credit();
    }, [])

    function total_credit()
    {
        let credit_statement = fetch('http://localhost:4000/total_credits').then(function(response) {
            return response.text();
          }).then(function(data) {
            console.log(data); // this will be a string
            set_income(data);
        });
        

    }
   
    function myfunc(e)
    {
        set_amount(e);
        var save = document.getElementById("Savings_amount")
        var amt = savings + (e*1);
        //save.innerHTML = amt;
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        let result = await fetch(
            'http://localhost:4000/insert_credit', {
                method: "post",
                body: JSON.stringify({ date, amount}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            console.warn(result);
            if (result) {
                alert("Data saved succesfully");
                set_date("");
                set_amount("");
                set_category("");
                set_savings(savings);
                document.getElementById('my_form').reset();
        }
        total_credit();
    }
    function viewfunc()
    {
        document.getElementById('credits').style.display = 'block';
        let result = fetch(
            'http://localhost:4000/earnings')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                set_credit(data);
            })
            .catch(err => {
                console.log(err);
            })
            //set_debit(result);
            console.log(result);
    }
    return(
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="App.css"></link>
            </head>
            <body className='credit_page'>
            <div className='container-fluid myclass'>
                <form id='my_form' onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" class="form-control" id="date" placeholder="Date" onChange={(e) => {set_date(e.target.value)}}></input>
                    </div>
                    <div class="form-group">
                        <label for="number">Amount</label>
                        <input type="number" class="form-control" id="amount" placeholder="0" min="0" onChange={(e) => {myfunc(e.target.value)}}></input>
                    </div>
                    <button type="submit" class="btn btn-primary" onSubmit={myfunc}>Submit</button>
                    <button type="reset" className='btn btn-primary' onClick={viewfunc}>View</button>
                    <h1 id="Savings_amount">{income}</h1>
                    <table id='credits' className='center'>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                        {
                                credit.map(i=>{
                                    return(
                                        <tr>
                                            <td>{i.date}</td>
                                            <td>{i.amount}</td>
                                        </tr>
                                    )
                                })
                        }
                        
                    </table>
                </form>
                
            </div>
            </body>
        </>
    )
}

export default Debit;