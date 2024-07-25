import fetch, { type Response } from "node-fetch";

export const usersUrl =
    "https://webhook.site/74a21588-7d3b-4eb7-91ed-11a1e498af1c";

export const fetchUsers = async (): Promise<User[]> => {
    const response: Response = await fetch(usersUrl);
    return (await response.json()) as User[];
};
