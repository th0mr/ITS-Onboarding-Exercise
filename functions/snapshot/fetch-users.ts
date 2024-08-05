import fetch, { type Response } from "node-fetch";
import type { User } from "./types.js";

export const usersUrl =
    "https://webhook.site/6b495c5d-95b3-40b1-b85d-49dcf76a3d44";

export const fetchUsers = async (): Promise<User[]> => {
    const response: Response = await fetch(usersUrl);
    return (await response.json()) as User[];
};
