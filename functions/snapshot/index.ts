import { generateSnapshot } from "./generate-snapshot.js";
import { fetchUsers } from "./fetch-users.js";

export const generateSnapshotFromWebhook = async (): Promise<void> => {
    generateSnapshot(await fetchUsers());
};

generateSnapshotFromWebhook();
