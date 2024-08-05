import { describe, it, expect, beforeAll } from "vitest";
import { Template } from "aws-cdk-lib/assertions";
import { App } from "aws-cdk-lib";
import { ManageBlackboardUsersStack } from "./manage-blackboard-users-stack.js";

describe("ManageBlackboardUsersStack", () => {
    beforeAll(() => {
        // Sets up "expect" with a snapshot serializer to replace buckets / assets with [ASSET BUCKET]
        // and [ASSET ZIP] to prevent breaking a snapshot test everytime the source code for the lambda is changed

        // Expected patterns for buckets and asset strings in the snapshots
        const bucketMatch = /cdk-[\da-z]{9}-assets-.*/;
        const assetMatch = /[\da-f]{64}\.zip/;

        expect.addSnapshotSerializer({
            test: (value) =>
                typeof value === "string" &&
                (bucketMatch.exec(value) !== null ||
                    assetMatch.exec(value) !== null),
            print(value) {
                // Substitute both the bucket part and the asset zip part
                let sval = `${value as string}`;
                sval = sval.replace(bucketMatch, "[ASSET BUCKET]");
                sval = sval.replace(assetMatch, "[ASSET ZIP]");
                return `"${sval}"`;
            },
        });
    });

    it("matches the snapshot", () => {
        const stack = new ManageBlackboardUsersStack(
            new App(),
            "ManageBlackboardUsersStack",
        );

        const template = Template.fromStack(stack);

        expect(template).toMatchSnapshot();
    });
});
