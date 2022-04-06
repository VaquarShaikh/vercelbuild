const app = require('./app');

const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
// const dotenv = require('dotenv').config({ path: require('config')('.env') });
const port = process.env.PORT || 4000;
const cloudinary = require('cloudinary')
// const dotenv = require("dotenv").config({ path: "backend/config/config.env" });

// Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

// previously the path was backend/config/config.env

// config
if(process.env.NODE_ENV !== 'PRODUCTION'){
    dotenv.config({path:'./config/config.env'});
}


connectDatabase()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(port , ()=>{
    console.log(`Server has started successfully and is running at http://localhost:${port}`)
});

// console.log(boba)

// Unhandled rejection

process.on("unhandledRejection" , err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});


