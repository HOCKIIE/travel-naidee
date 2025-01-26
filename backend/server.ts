import express, { Express } from 'express';
import env from "dotenv";
import TripRoutes from "./routes/TripRoutes";

env.config();
const app:Express = express();
const options = {
    address: "192.168.1.170",
    port: process.env.port || 3001
}
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/api/trips",TripRoutes);
const server = 
    app.listen(options,()=>{
        let host = server.address();
        console.log(host)
    })
    .on("error", function (err) {
        console.log(JSON.stringify(err))    
    });