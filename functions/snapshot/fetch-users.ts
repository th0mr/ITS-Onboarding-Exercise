import dotenv from "dotenv";
import fetch, { type Response } from "node-fetch";
import type { User } from "./types.js";

dotenv.config()

export const fetchUsers = async (): Promise<User[]> => {
    const usersUrl = process.env.WEBHOOK_URL;
    if (usersUrl === undefined) {
        throw new Error(
            "The environment variable WEBHOOK_URL is undefined in .env",
        );
    } else {
        const response: Response = await fetch(usersUrl);
        return (await response.json()) as User[];
    }
};
