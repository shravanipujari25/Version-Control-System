import fs from "fs/promises";
import path from "path";


async function add(filePath){
    const repoPath=path.resolve(process.cwd(),".gitfile");
    const stagingPath=path.join(repoPath,"staging");

    try{
      await fs.mkdir(stagingPath,{recursive:true});
      const fileName=path.basename(filePath);
      await fs.copyFile(filePath,path.join(stagingPath,fileName));
      console.log(`File ${fileName} added to the staging area !`);
    }
    catch(error){
        console.error("Error Adding File ",error);
    }
}

export default add;