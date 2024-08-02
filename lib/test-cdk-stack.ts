import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class TestCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, properties?: cdk.StackProps) {
        super(scope, id, properties);

        const lambda = new NodejsFunction(this, "snapshotLambda", {
            functionName: "generateSnapshotFromWebhook",
            entry: "functions/snapshot/index.ts",
            handler: "generateSnapshotFromWebhook",
            runtime: Runtime.NODEJS_20_X,
            memorySize: 128,
        });
    }
}
