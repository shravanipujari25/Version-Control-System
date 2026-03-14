import fs from "fs/promises";
import path from "path";
import supabase from "../supabaseClient.js";

async function pull() {

  const repoPath = path.resolve(process.cwd(), ".gitfile");
  const commitsPath = path.join(repoPath, "commits");

  try {

    // Step 1: list commit folders
    const { data: commits, error } = await supabase.storage
      .from("repo-storage")
      .list("");

    if (error) throw error;

    for (const commit of commits) {

      // Step 2: list files inside each commit folder
      const { data: files, error } = await supabase.storage
        .from("repo-storage")
        .list(commit.name);

      if (error) {
        console.error("Error listing files:", error);
        continue;
      }

      for (const file of files) {

        const filePath = `${commit.name}/${file.name}`;

        const { data, error } = await supabase.storage
          .from("repo-storage")
          .download(filePath);

        if (error) {
          console.error("Download error:", error);
          continue;
        }

        const localPath = path.join(commitsPath, commit.name, file.name);

        await fs.mkdir(path.dirname(localPath), { recursive: true });

        const buffer = Buffer.from(await data.arrayBuffer());

        await fs.writeFile(localPath, buffer);

        console.log("Downloaded:", filePath);
      }
    }

    console.log("Pull completed successfully");

  } catch (error) {
    console.error("Pull failed:", error);
  }
}

export default pull;