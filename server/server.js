require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const db = require('./db');
const cors=  require('cors');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


// Get all restaurants
app.get('/api/v1/restaurants',async(req,res,next) => {
    try{
        const response = await db.query("SELECT * FROM restaurants")
        res.status(201).json(
            {
                status:"success",
                results:response.rows.length,
                data:response.rows
            }
        )
    }
    catch(ex){
        console.log(ex.message);
    }
})


// Get all the reviews

app.get('/api/v1/restaurants/reviews',async(req,res,next) => {
    try{
        const response = await db.query("SELECT * FROM reviews");
        res.status(201).json({
            status:"success",
            results:response.rows.length,
            data:response.rows
        })
    }
    catch(ex){
        console.log(ex.message);
    }
})


// Get specific restaurant 
app.get('/api/v1/restaurants/:id',async(req,res,next) => {
    try{
        const { id } = req.params
        const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1",[id])

        const reviews = await db.query("SELECT * from reviews where restaurant_id = $1",[id]);

        res.status(201).json(
            {
                status:"success",
                restaurant:restaurant.rows[0],
                reviews:reviews.rows
            }
        )
    }
    catch(ex){
        console.log(ex.message);
    }
})

// Add a new restaurant
app.post('/api/v1/restaurants',async(req,res,next) => {
    try{
        const { name, location, price_range } = req.body;
        const response = await db.query("INSERT INTO restaurants (name,location,price_range) VALUES($1,$2,$3) RETURNING *",[name,location,price_range])
        res.status(201).json(response.rows[0]);
    }
    catch(ex){
        console.log(ex.message);
    }
})

app.put('/api/v1/restaurants/:id',async(req,res,next) => {
    try{
        const { id } = req.params;
        const { name, location, price_range } = req.body;
        const response = await db.query("UPDATE restaurants SET name =  $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",[name,location,price_range,id]);
        res.status(200).json(response.rows[0]);
    }
    catch(ex){
        console.log(ex.message)
    }
})

app.delete('/api/v1/restaurants/:id',async(req,res,next) => {
    try{
        const { id } = req.params;
        const response = await db.query("DELETE from restaurants WHERE id = $1",[ id ]);
        res.status(204).json({status:"success"});
    }
    catch(ex){
        console.log(ex.message)
    }
})
/*
app.get('/api/v1/restaurants/:id/reviews',async(req,res) => {
    try{
        const { id } = req.params;
        const response = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1",[id]);
        res.status(201).json(
            {
                status:"success",
                results:response.rows.length,
                data:response.rows
            }
        )
    }
    catch(ex){
        console.log(ex.message);
    }
})

*/

app.post('/api/v1/restaurants/:id/reviews',async(req,res,next)=>{
    try{
        const { id } = req.params;
        const { name, review, rating } = req.body;
        const response = await db.query("INSERT INTO reviews (restaurant_id,name,review,rating) VALUES($1,$2,$3,$4) RETURNING *",[id,name,review,rating])
        res.status(201).json(response.rows[0]);

    }
    catch(ex){
        console.log(ex.message);
    }
})


app.listen(port, () => {
    try{
        console.log(`listening on port ${port}`)
    }
    catch(ex){
        console.log(ex.message);
    }
})
