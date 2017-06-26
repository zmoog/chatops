terraform {
  required_version = ">= 0.9, < 0.10"
}

/*
 * Resources
 */

//
// Request phase
//

resource "aws_api_gateway_method" "method_request" {
  rest_api_id   = "${var.api_gateway_id}"
  resource_id   = "${var.api_gateway_resource_id}"
  http_method   = "POST"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "integration_request" {
  rest_api_id             = "${var.api_gateway_id}"
  resource_id             = "${var.api_gateway_resource_id}"
  http_method             = "${aws_api_gateway_method.method_request.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${var.api_gateway_lambda_arn}"
  credentials             = "${var.api_gateway_role_arn}"

  request_templates = "${var.integration_request_templates}"
}

//
// Response phase
//

resource "aws_api_gateway_integration_response" "integration_response" {
  rest_api_id = "${var.api_gateway_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method.method_request.http_method}"
  status_code = "${aws_api_gateway_method_response.method_response.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates = "${var.integration_response_templates}"
}

resource "aws_api_gateway_method_response" "method_response" {
  rest_api_id = "${var.api_gateway_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method.method_request.http_method}"
  status_code = "200"

  response_models = "${var.method_response_models}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

}
