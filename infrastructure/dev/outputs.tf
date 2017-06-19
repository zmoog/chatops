/*
 * Outputs
 */

output "api_gateway_invoke_url" {
  value = "${module.api.invoke_url}"
}

output "lambda_role_arn" {
  value = "${module.common.lambda_role_arn}"
}
