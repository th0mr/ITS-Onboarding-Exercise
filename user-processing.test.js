import {expect, describe, it} from "vitest";
import { getUserValues } from "./user-processing.js";

describe("getUserValues", () => {

    it("seperates values with bars", () => {
        const user = {
            id : 5,
            username : "abc123",
            firstName : "bob",
            lastName : "smith",
            studentId : "012345678"
        };

        const result = getUserValues(user);

        expect(result).toEqual("5|abc123|bob|smith|012345678");
    })

    it("respects empty values", () => {
        const user = {
            id : 5,
            username : "",
            firstName : "bob",
            lastName : "",
            studentId : "012345678"
        };

        const result = getUserValues(user);

        expect(result).toEqual("5||bob||012345678");
    })
})