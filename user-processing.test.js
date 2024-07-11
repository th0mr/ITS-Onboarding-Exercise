import { expect, describe, it } from "vitest";
import { getUserValues } from "./user-processing.js";

describe("getUserValues", () => {
    it("seperates user values with a bar", () => {
        const user = {
            id: 5,
            username: "abc123",
            firstName: "bob",
            lastName: "smith",
            studentId: "012345678",
        };

        const result = getUserValues(user);

        expect(result).toEqual("5|abc123|bob|smith|012345678");
    });

    it("respects empty values", () => {
        const user = {
            id: 5,
            username: "",
            firstName: "bob",
            lastName: "",
            studentId: "012345678",
        };

        const result = getUserValues(user);

        expect(result).toEqual("5||bob||012345678");
    });

    it(`outputs user property values in the order id, username, firstName, lastName, studentId
        regardless of the order of the input`, () => {
        const user = {
            lastName: "smith",
            id: 5,
            studentId: "012345678",
            firstName: "bob",
            username: "abc123",
        };

        const result = getUserValues(user);

        expect(result).toEqual("5|abc123|bob|smith|012345678");
    });

    it(`outputs user property values in the order id, username, firstName, lastName, studentId
        regardless of the input order, even if the user values are reversed`, () => {
        const user = {
            studentId: "012345678",
            lastName: "smith",
            firstName: "bob",
            username: "abc123",
            id: 5,
        };

        const result = getUserValues(user);

        expect(result).toEqual("5|abc123|bob|smith|012345678");
    });
});
