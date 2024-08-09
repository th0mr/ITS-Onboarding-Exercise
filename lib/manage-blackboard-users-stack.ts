import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Tags } from "aws-cdk-lib";
import dotenv from "dotenv";

dotenv.config();

export class ManageBlackboardUsersStack extends cdk.Stack {
    constructor(scope: Construct, id: string, properties?: cdk.StackProps) {
        super(scope, id, properties);

        const lambda = new NodejsFunction(this, "snapshotLambda", {
            functionName: "generateSnapshotFromWebhook",
            entry: "functions/snapshot/generate-snapshot-from-webhook.ts",
            handler: "generateSnapshotFromWebhook",
            runtime: Runtime.NODEJS_20_X,
            memorySize: 128,
            environment: {
                USER_API_ENDPOINT: process.env.USER_API_ENDPOINT ?? "",
            },
        });

        // Add tags to entire stack and all resources
        // Required Tags:
        Tags.of(this).add("york/policy_version", "2");
        Tags.of(this).add("york/name", "ManageBlackboardUserStack");
        Tags.of(this).add("york/group", "ESG");
        Tags.of(this).add("york/project", "ITS-Onboarding-Exercise");
        Tags.of(this).add("york/status", "dev");
        Tags.of(this).add("york/pushed_by", "manual");
        Tags.of(this).add("york/defined_in", "cdk");
        // Optional Tags:
        Tags.of(this).add("york/team", "Teaching and Learning");
        Tags.of(this).add("york/user", "tr901");
    }
}
