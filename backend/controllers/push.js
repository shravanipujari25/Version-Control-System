import fs from "fs/promises";
import path from "path";
import supabase from "../supabaseClient.js";

async function push() {
    const repoPath = path.resolve(process.cwd(), ".gitfile");
    const commitsPath = path.join(repoPath, "commits");

    try {

        const commits = await fs.readdir(commitsPath);

        for (const commit of commits) {

            const commitDir = path.join(commitsPath, commit);
            const files = await fs.readdir(commitDir);

            for (const file of files) {

                const filePath = path.join(commitDir, file);
                const fileContent = await fs.readFile(filePath);

                const { error } = await supabase.storage
                    .from("repo-storage")
                    .upload(`${commit}/${file}`, fileContent, {
                        upsert: true
                    });

                if (error) {
                    console.error("Upload error:", error);
                }
            }
        }

        console.log("Push completed successfully");

    } catch (error) {
        console.error("Push failed:", error);
    }
}

export default push;