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
            if (result) {
                alert("Data saved succesfully");
                set_date("");
                set_amount("");
                set_category("");
                set_savings(savings);
                document.getElementById('my_form').reset();
        }

        total_debit();

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
            //set_debit(result);
            console.log(result2);

            
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
                        <select class="form-control" id="cat1"  onChange={(e) => {set_category(e.target.value)}}>
                            <option>Click to select your category : </option>
                            <option value="Travel">Travel</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Food">Food</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary glow-on-hover" onSubmit={myfunc}>Submit</button>
                    <button type="submit" class="btn btn-primary glow-on-hover" onClick={viewfunc}>View</button>
                    <div className='centre-text'>
                        <h1 id="Savings_amount">{expenditure}</h1>
                    </div>
                    <table id='debits' className='center'>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                        </tr>
                        {
                                debit.map(i=>{
                                    return(
                                        <tr>
                                            <td>{i.date}</td>
                                            <td>{i.amount}</td>
                                            <td>{i.category}</td>
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