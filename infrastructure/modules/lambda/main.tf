/*
 * Resources
 */

module "lambda-role" {
  source = "../iam/role"

  project     = "${var.project}"
  environment = "${var.environment}"
  subject     = "lambda"

  principals = [
    "lambda.amazonaws.com",
  ]

  actions = [
    "logs:*",
  ]
}
