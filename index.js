const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


dotenv.config();    

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

app.use(cors({
    origin: process.env.FRONT_END_URL, // Replace with your frontend URL
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api', Router);

const PORT = process.env.PORT || 5050;  // Change from 5050 to 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
