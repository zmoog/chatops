/*
 * Outputs
 */

output "invoke_url" {
  value = "${aws_api_gateway_deployment.api-gateway-deployment.invoke_url}"
}
