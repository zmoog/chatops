/*
 * Outputs
 */

output "lambda-role-arn" {
  value = "${module.lambda-role.role_arn}"
}
