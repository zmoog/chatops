/*
 * Outputs
 */

output "id" {
  value = "${aws_api_gateway_rest_api.api-gateway.id}"
}

output "root_resource_id" {
  value = "${aws_api_gateway_rest_api.api-gateway.root_resource_id}"
}

output "role_arn" {
  value = "${module.api-gateway-role.role_arn}"
}

output "aa" {
  value = "${aw}"
}
