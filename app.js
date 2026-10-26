require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect");
const products_routes = require("./routes/products")
const dns = require("node:dns");

const PORT = process.env.PORT || 5000;
// middleware or to set router
app.use("/api/products",products_routes);

app.get("/",(req,res)=>{
    res.send("HI, I am Live")
})

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const start = async () =>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
           console.log(`${PORT} yes I am connected`)
        });
    }catch(error){
        console.error("Error starting the server: ",error.message);
    }
}
start();