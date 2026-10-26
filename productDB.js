require("dotenv").config();

const dns = require("node:dns");

// DNS resolver fix
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const connectDB = require("./db/connect");
const Product = require("./models/product")
const ProductJson = require("./products.json")

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("success")
    } catch (error) {
        console.error(error);
    }
}

start();