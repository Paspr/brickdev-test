import os from "os";
import { execSync } from "node:child_process"

const hostname = os.hostname();

// Function to get container name from Docker API
function getContainerName(containerId) {
    try {
        const dockerApiUrl = `http://localhost/containers/${containerId}/json`; //containerIdFromCgroup
        const result = execSync(`curl --unix-socket /var/run/docker.sock ${dockerApiUrl}`, { encoding: "utf8" });
        const containerInfo = JSON.parse(result);
        return containerInfo.Name.replace("/", "");
    } catch (error) {
        console.error("Error fetching container name:", error.message);
        return null;
    }
}

export {getContainerName, hostname};