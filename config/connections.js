const {connect, connection} = require("mongoose");

const connectionURI = 
process.enc.MONGODB_URI || 'mongodb+srv://admin:Lightiskira1!@cluster0.8rtlu1z.mongodb.net/test';

connect(connectionURI, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports =connection;