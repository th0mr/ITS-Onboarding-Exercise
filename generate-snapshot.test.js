import { generateSnapshot } from "./generate-snapshot";
import { expect, describe, it, vi } from "vitest";
import { when } from "vitest-when";
import { getUserValues } from "./user-processing";

vi.mock("./user-processing.js");

describe("generateSnapshot", () => {
    it("prints hello world", () => {
        console.log = vi.fn();

        when(getUserValues).calledWith("foo").thenReturn("bar");

        generateSnapshot("foo");

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith("bar");
    });
});
