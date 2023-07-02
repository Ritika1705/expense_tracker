       
        const express = require('express');
        const mongoose = require('mongoose');
        const cors = require('cors');
        const bodyParser = require('body-parser');
        const port = process.env.port || 4000;
        const app = express();
        app.use(cors())
        app.use(express.json())

        mongoose.set('strictQuery', false);

        mongoose.connect('mongodb+srv://ritika_mandal:vVtFx3ZYgCGkIR8n@cluster0.kvatgd2.mongodb.net/', {
        dbName: 'Expense_App',
        useNewUrlParser: true,
        useUnifiedTopology: true
        });

        const connection = mongoose.connection;

        connection.once('open', () => {
        console.log('MongoDB connection established successfully');
        });
        
        connection.on('error', (error) => {
            console.error(error);
        });

        const DebitSchema = new mongoose.Schema({
            date: Date,
            amount: Number,
            category:
            {
                    type: String,
                    enum: ['Travel', 'Accessories', 'Gadgets', 'Food', 'Other'],
                    required : true 
            }
        });

        const CreditSchema = new mongoose.Schema({
            date: Date,
            amount: Number
        })

        const Debit = mongoose.model('Debit', DebitSchema); //By default mongo will search for db 'debits' (lowercase 1st letter and appends 's' at the end)
        const Credit = mongoose.model('Credit',CreditSchema);

        app.get("/", (req, resp) => {
        
            resp.send("App is Working");
            // You can check backend is working or not by
            // entering http://loacalhost:5000
            
            // If you see App is working means
            // backend working properly
        });

        app.get('/expense', async(req, res) => {

            try{
                let debits = await Debit.find();
                res.send(debits);
            }
            catch(err)
            {
                console.log(err);
            }
        });

        app.get('/total_debits',async(req, res) => {
            try
            {
                let debits = await Debit.find();
                var sum = 0;
                debits.map(i => {
                
                    sum = sum + i.amount;
                })
                console.log(sum);
                res.send("Total debit : " + sum);
            }
            catch(err)
            {
                console.log(err);
            }
        })

        app.get('/total_credits',async(req, res) => {
            try
            {
                let credits = await Credit.find();
                var sum = 0;
                credits.map(i => {
                
                    sum = sum + i.amount;
                })
                console.log(sum);
                res.send("Total credit : " + sum);
            }
            catch(err)
            {
                console.log(err);
            }
        })

        app.get('/daily_spendings', async(req, res) => {
            try
            {
                var date = req.query.date;
                var query = "date: ISODate('" +  date + "')"
                console.log(query);
                let daily_credit = await Credit.find({date: new Date(date)});
                var credit_sum=0;
                daily_credit.map( i => {
                    credit_sum = credit_sum + i.amount;
                })

                let daily_debit = await Debit.find({date: new Date(date)});
                var debit_sum=0;
                daily_debit.map( i => {
                    debit_sum= debit_sum + i.amount;
                })

                console.log(credit_sum);
                res.setHeader('Content-type','text/html')

                if(debit_sum > credit_sum)
                {
                    res.send("Uh No ! You spent " + debit_sum + " rupees and earned " + credit_sum + " . Net savings = " + (credit_sum-debit_sum) + " rupees");
                }
                else if(credit_sum > debit_sum)
                {
                    res.send("Good job ! You saved : " + (credit_sum-debit_sum) + " rupees. Debit amount = " + debit_sum + " & Credit amount = " + credit_sum );
                }
                else if(credit_sum == debit_sum)
                {
                    res.send("You saved 0 rupees today. Total debit: " + debit_sum + " rupees. Total credit : " + credit_sum + " rupees");
                }

                console.log(debit_sum);
                

            }
            catch(err)
            {
                console.log(err);
            }
        })
        
        app.get('/earnings', async(req, res) => {

            try{
                let credits = await Credit.find();
                res.send(credits);
            }
            catch(err)
            {
                console.log(error);
            }
        });

        app.post('/insert', async(req, res) => {
            console.log(req.body);
            const date = req.body.date
            const amount = req.body.amount
            const category = req.body.category

            const formData = new Debit({
                date: date,
                amount: amount,
                category: category
            })

            try {
                await formData.save();
                res.send(req.body)
            } catch(err) {
                console.log(err)
            }
        });

        app.post('/insert_credit', async(req,res) => {
            const date = req.body.date
            const amount = req.body.amount

            const formData = new Credit({
                date: date,
                amount: amount
            })
            try{
                await formData.save();
                res.send(req.body)
            }catch(err) {
                console.log(err)
            }
        })

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });

     
     app.get('/travel_expense', async(req, res) => {

        try
            {
                var date = req.query.date;
                //console.log(query);
                let travel_expense = await Debit.find({category: "Travel"});
                var travel_debit_sum=0;
                travel_expense.map( i => {
                    travel_debit_sum = travel_debit_sum + i.amount;
                })
                console.log(travel_debit_sum);
                res.send(travel_debit_sum.toString());
            }
            catch(err)
            {
                console.log(err);
            }
     });

     app.get('/food_expense', async(req, res) => {

        try
            {
                var date = req.query.date;
                //console.log(query);
                let food_expense = await Debit.find({category: "Food"});
                var food_debit_sum=0;
                food_expense.map( i => {
                    food_debit_sum = food_debit_sum + i.amount;
                })
                console.log(food_debit_sum);
                res.send(food_debit_sum.toString());
            }
            catch(err)
            {
                console.log(err);
            }
     });

     app.get('/accessories_expense', async(req, res) => {

        try
            {
                var date = req.query.date;
                //console.log(query);
                let accessories_expense = await Debit.find({category: "Accessories"});
                var acccessories_debit_sum=0;
                accessories_expense.map( i => {
                    acccessories_debit_sum = acccessories_debit_sum+ i.amount;
                })
                console.log(acccessories_debit_sum);
                res.send(acccessories_debit_sum.toString());
            }
            catch(err)
            {
                console.log(err);
            }
     });

     app.get('/gadget_expense', async(req, res) => {

        try
            {
                var date = req.query.date;
                //console.log(query);
                let gadget_expense = await Debit.find({category: "Gadgets"});
                var gadget_debit_sum=0;
                gadget_expense.map( i => {
                    gadget_debit_sum = gadget_debit_sum+ i.amount;
                })
                console.log(gadget_debit_sum);
                res.send(gadget_debit_sum.toString());
            }
            catch(err)
            {
                console.log(err);
            }
     });

     app.get('/other_expense', async(req, res) => {

        try
            {
                var date = req.query.date;
                //console.log(query);
                let other_expense = await Debit.find({category: "Other"});
                var other_debit_sum=0;
                other_expense.map( i => {
                    other_debit_sum = other_debit_sum+ i.amount;
                })
                console.log(other_debit_sum);
                res.send(other_debit_sum.toString());
            }
            catch(err)
            {
                console.log(err);
            }
     });