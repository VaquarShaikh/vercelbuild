const mongoose = require('mongoose');

const connectDatabase = () => {   
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Connected to mongodb ${data.connection.host}`);
    })
}

module.exports = connectDatabase