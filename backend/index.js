import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import yargs from "yargs";
import mainRouter from "./routes/main.router.js";
import initRepo from "./controllers/init.js";
import add from "./controllers/add.js";
import push from "./controllers/push.js";
import pull from "./controllers/pull.js";
import revert from "./controllers/revert.js";
import commit from "./controllers/commit.js";
import { error } from "console";



yargs(process.argv.slice(2))
  .command("start", "Starts a new Server ",{}, startServer )
  .command("init", "Initialise a new repository",{}, initRepo )
  .command("add <file>" ,"Add a file to the repository",yargs=>{yargs.positional("file",{
           describe:"File to add to the staging area",
           type:"string",});
        },(argv)=>{add(argv.file);})
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commit(argv.message);
    }
  )
      
   .command("push","Push commits to S3",{},push)   
   .command("pull","Pull commits from S3",{},pull)  
   .command("revert <commitID>",
   "Revert to a specific commit",
   (yargs) => {
    yargs.positional("commitID", {
      describe: "Commit ID to revert to",
      type: "string",
    });
  },
  (argv) => {
    revert(argv.commitID);
  }
)
  .demandCommand(1)
  .help()
  .parse();


  function startServer(){
    const app=express();
    const PORT=process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI=process.env.MONGODB_URI;

    mongoose.connect(mongoURI).then(()=>console.log("MONGODB Connected !")).
    catch((error)=>
                console.error("Unable to connect MONGODB :",error));
    app.use(cors({origin:"*"}));

      const httpServer=http.createServer(app);
      const io=new Server(httpServer,{
        cors:{
          origin:"*",
          methods:["GET","POST"]
        },
      });
    
      app.use("/",mainRouter);
      
      let user="test";
      io.on("connection",(socket)=>{
        socket.on("joinRoom",(userID)=>{
          user=userID;
          console.log("====");
          console.log(user);
          console.log("====");
          socket.join(userID);
        })
      })

      const db=mongoose.connection;

      db.once("open",async()=>{
        console.log("CRUD operations are called");
        //CRUD operations
      })

    httpServer.listen(PORT,()=>{
      console.log(`Server is running on PORT : ${PORT}`);
    })
  }