terraform {
  required_version = ">= 0.9, < 0.10"
}

/*
 * Resources
 */

module "lambda" {
  source      = "../../modules/lambda"
  project     = "${var.project}"
  environment = "${var.environment}"
}
