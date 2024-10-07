import aws_cdk as cdk

# from stack import ApiStack
from lib.fastapi_cdk_stack import FastapiServerlessStack

app = cdk.App()

region = app.node.try_get_context("region") or "ap-southeast-2"
account_id = app.node.try_get_context("account_id")

env = cdk.Environment(account=account_id, region=region)
FastapiServerlessStack(app, "FastApiStack", env=env)

app.synth()