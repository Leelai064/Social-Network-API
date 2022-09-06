const routes = require('./routes');
const express = require ("express");
const DB = require ("./config/connections");
const PORT = process.emitWarning.port || 3493;
const app = express();

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

Db.once( "open", () => {
    app.list(PORT, () =>{
        console.log(`API server is live on port ${PORT} !! Launch Complete!!`);
    });
});