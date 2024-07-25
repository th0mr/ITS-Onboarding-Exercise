import { generateSnapshot } from "./generate-snapshot.js";
import { fetchUsers } from "./fetch-users.js";

generateSnapshot(await fetchUsers());
