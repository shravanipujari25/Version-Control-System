import yargs from "yargs";
import initRepo from "./controllers/init.js";
import add from "./controllers/add.js";
import push from "./controllers/push.js";
import pull from "./controllers/pull.js";
import revert from "./controllers/revert.js";
import commit from "./controllers/commit.js";


yargs(process.argv.slice(2))
  .command("init", "Initialise a new repository",{}, initRepo )
  .command("add <file>" ,"Add a file to the repository",yargs=>{yargs.positional("file",{
           describe:"File to add to the staging area",
           type:"string",});
        },(argv)=>{add(argv.file);})
  .command("commit<message>","Commit the stage file",yargs=>{yargs.positional("message",{
           describe:"Commit Message",
           type:"string"  });
        },commit)     
   .command("push","Push commits to S3",{},push)   
   .command("pull","Pull commits from S3",{},pull)  
   .command("revert<commitID>","Revert to a specific commit",yargs=>{yargs.positional("commitID",{
           describe:"Commit ID to revert to",
           type:"string"});
        },revert)
  .demandCommand(1)
  .help()
  .parse();