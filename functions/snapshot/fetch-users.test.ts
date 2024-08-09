import { beforeEach, describe, it, vi, expect } from "vitest";
import fetch, { type Response } from "node-fetch";
import { fetchUsers } from "./fetch-users.js";
import type { User } from "./types.js";

vi.mock("node-fetch");

describe("fetchUsers", () => {
    beforeEach(() => {
        // Reset the mock before each test run to ensure number of calls is reset back to 0 after each test
        vi.mocked(fetch).mockReset();
        // Set environment variable USER_API_ENDPOINT to "mockUrl" so the tests run regardless of the state of .env
        process.env.USER_API_ENDPOINT = "mockUrl";
    });

    it("The function does not fetch if the USER_API_ENDPOINT environment variable is unset", async () => {
        // Delete the environment variable from process.env
        delete process.env.USER_API_ENDPOINT;

        // We expect that no fetch has been attempted and an error was thrown
        await expect(fetchUsers()).rejects.toThrowError(
            "The environment variable USER_API_ENDPOINT is undefined in .env",
        );
        expect(fetch).toHaveBeenCalledTimes(0);
    });

    it("uses the webhook stored in the environment variable USER_API_ENDPOINT", async () => {
        vi.mocked(fetch).mockResolvedValue({
            json: async () => [],
        } as Response);

        await fetchUsers();

        // Check that the mock fetch function was called with the value of the environment variable
        expect(fetch).toHaveBeenCalledWith("mockUrl");
    });

    it("it returns an empty array when the webhook is empty", async () => {
        vi.mocked(fetch).mockResolvedValue({
            json: async () => [],
        } as Response);

        const userArray: User[] = await fetchUsers();

        expect(userArray).toEqual([]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("it returns a non-empty array when the webhook contains multiple users", async () => {
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

        expect(userArray).toEqual([user1, user2]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
