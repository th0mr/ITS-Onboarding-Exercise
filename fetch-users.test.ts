import { beforeEach, describe, it, vi, expect } from "vitest";
import fetch, { type Response } from "node-fetch";
import { fetchUsers } from "./fetch-users.js";

vi.mock("node-fetch");

describe("fetchUsers", () => {
    beforeEach(() => {
        // Reset the mock before each test run to ensure number of calls is reset back to 0 after each test
        vi.mocked(fetch).mockReset();
    });

    it("it returns an empty array when the webhook is empty", async () => {
        vi.mocked(fetch).mockResolvedValue({
            json: async () => [],
        } as Response);

        const userArray: User[] = await fetchUsers();

        expect(userArray.length).toEqual(0);
        expect(userArray).toEqual([]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("it returns an empty array when the webhook contains users", async () => {
        const user1: User = {
            id: 1,
            username: "abc123",
            firstName: "fName1",
            lastName: "lName1",
            studentId: "123456789",
        };

        const user2: User = {
            id: 2,
            username: "xyz789",
            firstName: "fName2",
            lastName: "lName2",
            studentId: "987654321",
        };

        vi.mocked(fetch).mockResolvedValue({
            json: async () => [user1, user2],
        } as Response);

        const userArray: User[] = await fetchUsers();

        expect(userArray.length).toEqual(2);
        expect(userArray).toEqual([user1, user2]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
