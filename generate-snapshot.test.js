import { expect, describe, it, vi } from "vitest";
import { when } from "vitest-when";
import { getUserValues } from "./user-processing.js";
import { generateSnapshot } from "./generate-snapshot.js";

vi.mock("./user-processing.js");

describe("generateSnapshot", () => {
    it("creates an empty snapshot when given no users", () => {
        console.log = vi.fn();

        generateSnapshot([]);

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenNthCalledWith(
            1,
            "EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID",
        );
    });

    it("creates a snapshot with a single user", () => {
        console.log = vi.fn();

        when(getUserValues).calledWith("user1").thenReturn("foo");

        generateSnapshot(["user1"]);

        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenNthCalledWith(
            1,
            "EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID",
        );
        expect(console.log).toHaveBeenNthCalledWith(2, "foo");
    });

    it("creates a snapshot with multiple users", () => {
        console.log = vi.fn();

        when(getUserValues).calledWith("user1").thenReturn("foo");
        when(getUserValues).calledWith("user2").thenReturn("bar");

        generateSnapshot(["user1", "user2"]);

        expect(console.log).toHaveBeenCalledTimes(3);
        expect(console.log).toHaveBeenNthCalledWith(
            1,
            "EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID",
        );
        expect(console.log).toHaveBeenNthCalledWith(2, "foo");
        expect(console.log).toHaveBeenNthCalledWith(3, "bar");
    });
});
