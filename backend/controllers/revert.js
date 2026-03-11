import fs from "fs/promises";
import path from "path";

async function revert(commitID) {

    const repoPath = path.resolve(process.cwd(), ".gitfile");
    const commitDir = path.join(repoPath, "commits", commitID);

    try {

        // check if commit exists
        await fs.access(commitDir);

        const files = await fs.readdir(commitDir);

        for (const file of files) {

            if (file === "commit.json") continue; // skip metadata

            const sourcePath = path.join(commitDir, file);
            const destinationPath = path.join(process.cwd(), file);

            await fs.copyFile(sourcePath, destinationPath);
        }

        console.log(`Reverted to commit ${commitID}`);

    } catch (error) {
        console.error("Revert failed:", error);
    }
}

export default revert;