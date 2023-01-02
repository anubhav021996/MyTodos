const express= require("express");
const app= express();
require("dotenv").config();

const connect= require("./configs/db");

app.use(express.json());

let port= process.env.PORT || 2548;
app.listen(port,async()=>{
    try{
        await connect();
        console.log("Listening");
    }
    catch(e){
        console.log(e.message);
    }
});