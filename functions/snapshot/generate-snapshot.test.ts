import { expect, describe, it, vi, beforeEach } from "vitest";
import { when } from "vitest-when";
import { getUserValues } from "./user-processing.js";
import { generateSnapshot } from "./generate-snapshot.js";
import type { User } from "./types.js";

vi.mock("./user-processing.js");

describe("generateSnapshot", () => {
    beforeEach(() => {
        // Mock console.log
        console.log = vi.fn();
    });

    it("creates an empty snapshot when given no users", () => {
        generateSnapshot([]);

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenNthCalledWith(
            1,
            "EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID",
        );
    });

    it("creates a snapshot with a single user", () => {
        const user1: User = {
            id: 1,
            username: "abc123",
            firstName: "fName1",
            lastName: "lName1",
            studentId: "123456789",
        };

        when(getUserValues).calledWith(user1).thenReturn("foo");

        generateSnapshot([user1]);

        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenNthCalledWith(
            1,
            "EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID",
        );
        expect(console.log).toHaveBeenNthCalledWith(2, "foo");
    });

    it("creates a snapshot with multiple users", () => {
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

        when(getUserValues).calledWith(user1).thenReturn("foo");
        when(getUserValues).calledWith(user2).thenReturn("bar");

        generateSnapshot([user1, user2]);

        expect(console.log).toHaveBeenCalledTimes(3);
        expect(console.log).toHaveBeenNthCalledWith(
            1,
            "EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID",
        );
        expect(console.log).toHaveBeenNthCalledWith(2, "foo");
        expect(console.log).toHaveBeenNthCalledWith(3, "bar");
    });
});
