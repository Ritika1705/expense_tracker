import '../App.css';
import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';

function Daily_Savings()
{
    const[daily_savings,set_daily_savings] = useState("");

    const handleSubmit = async(e) => {

        e.preventDefault();
        var parameter = e.target.date.value;
        const d = new Date(parameter);
        let text = d.toISOString();
        console.log(text);
        let daily_savings = fetch('http://localhost:4000/daily_spendings?date=' + text).then(function(response) {
            return response.text();
          }).then(function(data) {
            console.log(data); // this will be a string
            set_daily_savings(data);
        });
        
    }
    return(
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="App.css"></link>
            </head>
            <body className='home_body'>
                <div class="center-screen">
                    <form id='my_form' onSubmit={handleSubmit}>
                        <div class="form-group ">
                            <label for="date" className='credit_form'>Date</label>
                            <input type="date" class="form-control" id="date" placeholder="Date"></input>
                        </div>
                        <button type="submit" class="btn btn-primary glow-on-hover">Submit</button>
                        <div className='centre-text'>
                            <h3 id="Savings_amount">{daily_savings}</h3>
                        </div>
                    </form>
                </div>
            </body>
            
        </>
    )
}

export default Daily_Savings;