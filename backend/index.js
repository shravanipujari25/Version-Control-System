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
        },add)
  .demandCommand(1)
  .help()
  .parse();