const {connect, connection} = require("mongoose");

const connectionURI = 
process.enc.MONGODB_URI || 'mongodb+srv://admin:<password>@cluster0.8rtlu1z.mongodb.net/test';

connect 

module.exports =connection;