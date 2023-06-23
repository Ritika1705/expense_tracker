       
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

     
     