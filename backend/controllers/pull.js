import fs from "fs/promises";
import path from "path";
import supabase from "../supabaseClient.js";

async function pull() {

    const repoPath = path.resolve(process.cwd(), ".gitfile");
    const commitsPath = path.join(repoPath, "commits");

    try {

        const { data: files, error } = await supabase.storage
            .from("repo-storage")
            .list("", { recursive: true });

        if (error) throw error;

    for (const file of files) {

    if (!file.name.includes(".")) continue; // skip folders

    const { data, error } = await supabase.storage
        .from("repo-storage")
        .download(file.name);

    if (error) {
        console.error("Download error:", error);
        continue;
    }

    const localPath = path.join(commitsPath, file.name);

    await fs.mkdir(path.dirname(localPath), { recursive: true });

    const buffer = Buffer.from(await data.arrayBuffer());

    await fs.writeFile(localPath, buffer);
}
        console.log("Pull completed successfully");

    } catch (error) {
        console.error("Pull failed:", error);
    }
}

export default pull;