import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import Axios from 'axios';

function Navbar()
{
    return(
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="App.css"></link>
            </head>
            <body>
            <nav class="navbar navbar-expand-lg navbar-light navbar-ul navbar-custom">
                <a class="navbar-brand" href="#"></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse navbar-ul" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto" id="custom_list">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Credit">Credit</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Debit">Debit</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Daily-Savings">Daily Savings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Transactions">Transactions</a>
                        </li>
                    </ul>
                </div>
            </nav>
            </body>
        </>
    )
}

export default Navbar;