const routes = require('./routes');
const express = require ("express");
const db = require ("./config/connections");
const PORT = process.emitWarning.port || 3001;
const app = express();

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

db.once( "open", () => {
    app.listen(PORT, () =>{
        console.log(`API server is live on port ${PORT} !! Launch Complete!!`);
    });
});