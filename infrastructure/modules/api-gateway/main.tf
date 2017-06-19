terraform {
  required_version = ">= 0.9, < 0.10"
}

/*
 * Resources
 */

resource "aws_api_gateway_rest_api" "api-gateway" {
  name        = "${var.project}-${var.environment}-api"
  description = "${var.project} ${var.environment} API"

  depends_on = [
    "module.api-gateway-role",
  ]
}

module "api-gateway-role" {
  source = "../iam/role"

  project     = "${var.project}"
  environment = "${var.environment}"
  subject     = "api-gateway"

  principals = [
    "apigateway.amazonaws.com",
  ]

  actions = [
    "lambda:InvokeFunction",
  ]
}
