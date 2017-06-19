terraform {
  required_version = ">= 0.9, < 0.10"
}

/*
 * Resources
 */

module "api-gateway" {
  source      = "../../modules/api-gateway"
  project     = "${var.project}"
  environment = "${var.environment}"
}

resource "aws_api_gateway_resource" "commands" {
  rest_api_id = "${module.api-gateway.id}"
  parent_id   = "${module.api-gateway.root_resource_id}"
  path_part   = "commands"
}

resource "aws_api_gateway_resource" "ecs" {
  rest_api_id = "${module.api-gateway.id}"
  parent_id   = "${aws_api_gateway_resource.commands.id}"
  path_part   = "ecs"
}

////// Integration

module "lambda-integration-ecs" {
  source                  = "../../modules/api-gateway/integration-lambda"
  api_gateway_id          = "${module.api-gateway.id}"
  api_gateway_resource_id = "${aws_api_gateway_resource.ecs.id}"
  api_gateway_role_arn    = "${module.api-gateway.role_arn}"

  api_gateway_lambda_arn = "${format("arn:aws:apigateway:%s:lambda:path/2015-03-31/functions/arn:aws:lambda:%s:%s:function:%s_%s_%s:%s/invocations", var.aws_region, var.aws_region, var.aws_account_id, var.project, var.environment, "hello", "$LATEST")}"
}

////// Integration

resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  stage_name  = "v0"
  rest_api_id = "${module.api-gateway.id}"

  depends_on = [
    "aws_api_gateway_resource.commands",
    "module.lambda-integration-ecs",
  ]
}
