import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const _dirname = dirname(fileURLToPath(import.meta.url));

import pg from "pg";
import bcrypt from "bcrypt";
const db= new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "GYM",
    password: "sensei",
    port: 5432,
})

const salt=10;

db.connect();

const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8000;

app.get("/", (req, res) => {
    console.log(_dirname);
    res.sendFile(_dirname + "/index.html");
});

app.get("/get_started", (req, res) => {
    res.render("get_started.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/resources", (req, res) => {
    console.log(_dirname);
    res.sendFile(_dirname + "/index.html");
});


app.get("/legs", (req, res) => {
    res.render("legs.ejs");
})
app.post("/get_started", async(req, res) => {
    console.log(req.body);
    const name=req.body.name;
    const password=req.body.password;
    const email=req.body.email;
    
    try{
        const check_if_exist=await db.query("select * from gym where enail=$1",[email]);

        if(check_if_exist.rows.lenght>0){
            alert("user already exists,try with new email");
        }
        else{
            //password hasshing

            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(hash);
                    const result=await db.query("insert into gym(name,enail,password) values($1,$2,$3)",[name,email,hash]);
                    console.log(result);
                    res.render("login.ejs");
                }
            })
            
        }
    }
    catch(err){
        console.log(err);
    }
    
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    const email=req.body.email;
    const password=req.body.password;

    try{
        const result= await db.query("select * from gym where enail=$1",[email]);
        if(result.rows.length>0){
            const user=result.rows[0];
            const stored_hashed_password=user.password;

            bcrypt.compare(password,stored_hashed_password,(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    if(result){
                        res.render("welcome.ejs");
                    }
                    else{
                        res.send("Incorrect password");
                    }
                }
            })
        }
        else{
            res.send("User not found");
        }
    } catch(err){
        console.log(err);
    }
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// db.query("select * from gym", (err, res) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(res.rows);
//     }
//     db.end();
// });
