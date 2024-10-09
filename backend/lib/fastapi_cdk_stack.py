import os
from aws_cdk import (
    aws_lambda as lambda_,
    aws_iam as iam,
    Stack,
    Duration,
    BundlingOptions,
    CfnOutput,
)
from constructs import Construct
from aws_cdk.aws_iam import ServicePrincipal, ManagedPolicy

from aws_cdk.aws_apigatewayv2 import (
    HttpApi,
    HttpMethod,
    CorsHttpMethod,
    CorsPreflightOptions,
)
from aws_cdk.aws_apigatewayv2_integrations import HttpLambdaIntegration


class FastapiServerlessStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        lambda_role = iam.Role(
            self,
            "LambdaExecutionRole",
            assumed_by=ServicePrincipal("lambda.amazonaws.com"),
        )
        lambda_role.add_managed_policy(
            ManagedPolicy.from_aws_managed_policy_name(
                "service-role/AWSLambdaBasicExecutionRole"
            )
        )

        fastapi_handler = lambda_.Function(
            self,
            "FastApiHandler",
            code=lambda_.Code.from_asset(
                "lambda",
                bundling=BundlingOptions(
                    image=lambda_.Runtime.PYTHON_3_11.bundling_image,
                    command=[
                        "bash",
                        "-c",
                        "pip install -r requirements.txt -t /asset-output && cp -au . /asset-output",

                    ],
                ),
            ),
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="main.handler",
            # Comment the below line out unless you are using ARM64 based system to build the lambda image.
            # architecture=lambda_.Architecture.ARM_64,
            environment={
                "PROJECT_NAME": "Full Stack AI Engineer Template",
                "STACK_NAME": "full-stack-fastapi-project",
                "SECRET_KEY": os.getenv("SECRET_KEY"),
                "FIRST_SUPERUSER": "admin@example.com",
                "FIRST_SUPERUSER_PASSWORD": os.getenv("FIRST_SUPERUSER_PASSWORD"),
                "ENCRYPTION_KEY": os.getenv("ENCRYPTION_KEY"),
                "USERS_OPEN_REGISTRATION": "True",
                "SMTP_HOST": "",
                "SMTP_USER": "",
                "SMTP_PASSWORD": "",
                "EMAILS_FROM_EMAIL": "info@example.com",
                "SMTP_TLS": "True",
                "SMTP_SSL": "False",
                "SMTP_PORT": "587",
                "POSTGRES_SERVER": os.getenv("POSTGRES_SERVER"),
                "POSTGRES_PORT": os.getenv("POSTGRES_PORT"),
                "POSTGRES_DB": os.getenv("POSTGRES_DB"),
                "POSTGRES_USER": os.getenv("POSTGRES_USER"),
                "POSTGRES_PASSWORD": os.getenv("POSTGRES_PASSWORD"),
                "SENTRY_DSN": "",
            },
            role=lambda_role,
            memory_size=128,
            # timeout=Duration.seconds(29),
        )

        http_api = HttpApi(
            self,
            "HttpApiGateway",
            cors_preflight=CorsPreflightOptions(
                allow_headers=["Authorization", "Content-Type"],
                allow_methods=[
                    CorsHttpMethod.OPTIONS,
                    CorsHttpMethod.GET,
                    CorsHttpMethod.HEAD,
                    CorsHttpMethod.POST,
                ],
                allow_origins=["*"],
                max_age=Duration.days(10),
            ),
        )
        http_api.add_routes(
            path="/{proxy+}",
            methods=[HttpMethod.ANY],
            integration=HttpLambdaIntegration(
                "ApiIntegration", handler=fastapi_handler
            ),
        )

        CfnOutput(self, "HttpApiGatewayUrl", value=http_api.url)