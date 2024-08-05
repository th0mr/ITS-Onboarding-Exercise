import { getUserValues } from "./user-processing.js";
import type { User } from "./types.js";

export const generateSnapshot = (users: User[]) => {
    console.log("EXTERNAL_PERSON_KEY|USER_ID|FIRSTNAME|LASTNAME|STUDENT_ID");
    for (const user of users) {
        console.log(getUserValues(user));
    }
};
