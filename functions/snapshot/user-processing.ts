import type { User } from "./types.js";

export const getUserValues = (userObject: User): string =>
    userObject.id +
    "|" +
    userObject.username +
    "|" +
    userObject.firstName +
    "|" +
    userObject.lastName +
    "|" +
    userObject.studentId;
