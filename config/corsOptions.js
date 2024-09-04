const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
    console.log('Origin:', origin); // Add this line for debugging
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        console.log('Blocked by CORS:', origin); // Add this line for debugging
        callback(new Error('Not allowed by CORS'));
    }
},

    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization'],
    optionSuccessStatus: 200 // For older browsers that choke on 204
}

module.exports = corsOptions;
