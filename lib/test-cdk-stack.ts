import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Runtime} from "aws-cdk-lib/aws-lambda";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambda = new NodejsFunction(this, "snapshotLambda", {
            functionName: "generateSnapshotFromWebhook",
            entry: "functions/snapshot/index.ts",
            handler: "generateSnapshotFromWebhook",
            runtime: Runtime.NODEJS_20_X,
            memorySize: 128,
        });


    }
}
