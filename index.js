import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const body = app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/generate",(req,res)=>{
    const result = req.body.code;
    console.log(result);
    res.send(result);
})

app.listen(port,()=>{
    console.log("server is running");
})