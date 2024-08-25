const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const corsOptions = require('./config/corsOptions'); // Import your custom CORS options

dotenv.config();

const app = express();

// Use custom CORS options
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api', Router);

const PORT = process.env.PORT || 5050;  // Change from 5050 to 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
